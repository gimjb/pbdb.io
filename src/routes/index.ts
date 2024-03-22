import path from 'path'
import express from 'express'

// Sub-routes
import admin from './admin'
import auth from './auth'
import definitions from './definitions'
import privacy from './privacy'
import terms from './terms'

const router = express.Router()

router.use((req, res, next) => {
  if (typeof req.session.discord !== 'undefined') {
    res.locals.discord = req.session.discord
  }

  next()
})

router.get('/', (req, res) => {
  res.render(path.join(__dirname, 'index'))
})

router.use('/admin/', admin)
router.use('/auth/', auth)
router.use('/definitions/', definitions)
router.use('/privacy/', privacy)
router.use('/terms/', terms)

export default router
