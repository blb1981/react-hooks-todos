const express = require('express')
const path = require('path')
const app = express()
const logger = require('morgan')
const fs = require('fs')

const port = process.env.PORT || 5000
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.enable('trust proxy')
app.use(logger('common', { stream: accessLogStream}))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Handle 404
app.use((req, res) => {
  res.status(404).send('404: Page not Found')
})

// Handle 500
app.use((error, req, res, next) => {
  res.status(500).send('500: Internal Server Error')
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
