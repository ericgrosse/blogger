const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const registerRoute = require('./routes/register')
require('./db')() // handles mongoose connection logic

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use('/register', registerRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})