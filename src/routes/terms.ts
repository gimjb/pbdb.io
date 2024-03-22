import path from 'path'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.render(path.join(__dirname, 'terms'))
})

export default router
