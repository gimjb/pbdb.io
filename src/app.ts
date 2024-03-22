/* eslint-disable import/first */
import crypto from 'crypto'
import 'dotenv/config'
import express from 'express'
import log from '@gimjb/log'
log.path = 'logs.txt'
import mongoose from 'mongoose'
import routes from './routes'
import session from 'express-session'

mongoose
  .connect(process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/pbdb')
  .then(() => {
    void log.info('Connected to MongoDB')
  })
  .catch(async error => {
    await log.error(error)
    process.exit(1)
  })

const app = express()
const sessionSecret = crypto.randomUUID()

app.set('view engine', 'pug')
app.use(session({ secret: sessionSecret }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', routes)

app.listen(8080, () => {
  void log.info('Server started at http://[::1]:8080/')
})
