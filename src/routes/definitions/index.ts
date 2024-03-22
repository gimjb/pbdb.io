import path from 'path'
import express from 'express'
import log from '@gimjb/log'
import { authenticate } from '../auth'
import TermSubmission from '../../models/TermSubmission'

// Sub-routes
import guidelines from './guidelines'
import newRoute from './new'
import preview from './preview'

const router = express.Router()

// Authentication middleware
router.use((req, res, next) => {
  if (typeof req.session.discord === 'undefined') {
    authenticate(req, res)
    return
  }

  next()
})

router.get('/', (req, res) => {
  TermSubmission.getByAuthor(req.session.discord?.id ?? '').then(submissions => {
    res.render(path.join(__dirname, 'index'), { discord: req.session.discord, submissions })
  }).catch(reason => {
    res.status(500).send()
    void log.error(reason)
  })
})

router.use('/guidelines/', guidelines)
router.use('/new/', newRoute)
router.use('/', preview)

export default router
