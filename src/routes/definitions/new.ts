import path from 'path'
import express from 'express'
import log from '@gimjb/log'
import TermSubmission from '../../models/TermSubmission'

const router = express.Router()

router.get('/', (req, res) => {
  res.render(path.join(__dirname, 'new'))
})

router.post('/', (req, res) => {
  if (
    typeof req.session.discord?.id !== 'string' ||
    typeof req.body.title !== 'string' ||
    typeof req.body.description !== 'string' ||
    req.body.accept !== 'on'
  ) {
    res.status(400).send('Invalid request')
    return
  }

  new TermSubmission({
    author: req.session.discord.id,
    title: req.body.title,
    description: req.body.description
  }).save().then(submission => {
    res.redirect(`/definitions/${submission._id.toString()}`)
  }).catch(error => {
    res.status(500).send('Failed to save submission')
    void log.error(error)
  })
})

export default router
