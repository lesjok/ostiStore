import express from 'express'

import { config } from 'dotenv'

config({ path: '../.env' })

const app = express()
const port = 3001

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    process.env.REACT_APP_CORS_URL || '',
  )
  res.header('Access-Control-Allow-Methods', 'GET')
  next()
})

app.get('/api/feature-flag', (req, res) => {
  res.json({
    isTelegramShareEnabled: true,
  })
})

app.listen(port)
