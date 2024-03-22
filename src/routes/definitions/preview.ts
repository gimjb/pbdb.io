import path from 'path'
import express from 'express'
import log from '@gimjb/log'
import TermSubmission from '../../models/TermSubmission'

const router = express.Router()

router.get('/:id', (req, res) => {
  TermSubmission.findById(req.params.id).then(submission => {
    res.render(path.join(__dirname, 'preview'), {
      title: submission?.title,
      description: submission?.description
    })
  }).catch(error => {
    res.status(500).send('Failed to fetch submission')
    void log.error(error)
  })
})

export default router
