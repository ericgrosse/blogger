const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/', (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(400).send({error: 'missing username and/or password in payload'})
    return
  }

  const user = new User(req.body)

  user.save((err) => {
    if (err) {
      return console.error(err)
    } 
    res.status(201).send({username: req.body.username})
  })
})

module.exports = router