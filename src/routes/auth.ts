import express from 'express'
import log from '@gimjb/log'
import undici from 'undici'

const discordId = process.env['DISCORD_ID'] ?? ''
const discordSecret = process.env['DISCORD_SECRET'] ?? ''
const discordRedirect = process.env['DISCORD_REDIRECT'] ?? 'http://[::1]:8080/auth/discord/callback'

const router = express.Router()

router.get('/discord/callback', (req, res) => {
  void undici.request('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: discordId,
      client_secret: discordSecret,
      grant_type: 'authorization_code',
      code: req.query['code']?.toString() ?? '',
      redirect_uri: discordRedirect,
      scope: 'identify'
    }).toString()
  }).then(response => {
    if (response.statusCode !== 200) {
      res.status(500).send('Failed to verify with Discord')
      return
    }

    response.body.on('data', data => {
      const { token_type: tokenType, access_token: accessToken, expires_in: expiresIn } = JSON.parse(data.toString()) as DiscordTokenResponse
      void undici.request('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      }).then(response => {
        if (response.statusCode !== 200) {
          res.status(500).send('Failed to get user information from Discord')
          return
        }

        response.body.on('data', data => {
          const userData = JSON.parse(data.toString()) as DiscordUserResponse

          req.session.discord = {
            accessToken,
            id: userData.id,
            avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar ?? ''}.webp`,
            globalName: userData.global_name ?? userData.username,
            locale: userData.locale
          }
          req.session.cookie.expires = new Date(Date.now() + expiresIn * 1000)

          res.redirect(req.session.redirect ?? '/')
        })
      }).catch(log.error)
    })
  }).catch(log.error)
})

router.get('/discord/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

export function authenticate (req: express.Request, res: express.Response): void {
  req.session.redirect = req.originalUrl + (
    req.method === 'GET'
      ? ''
      : (req.originalUrl.includes('?') ? '&' : '?') + new URLSearchParams(req.body).toString()
  )
  res.redirect(
    'https://discord.com/oauth2/authorize?response_type=code&scope=identify' +
    `&client_id=${discordId}&redirect_uri=${discordRedirect}`
  )
}

export default router
