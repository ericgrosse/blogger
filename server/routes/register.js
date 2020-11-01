const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/', (req, res) => {
  const user = new User(req.body)
  user.save((err) => {
    if (err) {
      return console.error(err)
    } 
    res.status(201).send(user)
  })
})

module.exports = router