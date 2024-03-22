import path from 'path'
import express from 'express'
import log from '@gimjb/log'
import { authenticate } from './auth'
import TermSubmission from '../models/TermSubmission'

const router = express.Router()

router.use((req, res, next) => {
  if (typeof req.session.discord === 'undefined') {
    authenticate(req, res)
    return
  }

  next()
})

router.get('/', (req, res) => {
  if (req.session.discord?.id !== process.env['ADMIN_ID']) {
    res.status(403).send('You are not authorized to access this page.')
    return
  }

  TermSubmission.find().then(submissions => {
    res.render(path.join(__dirname, 'admin'), { submissions })
  }).catch(reason => {
    res.status(500).send('An error occurred. Please try again later.')
    void log.error(reason)
  })
})

export default router
