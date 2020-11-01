const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/', async (req, res) => {
  const user = new User({...req.body, posts: []})

  try {
    await user.save()
    res.status(201).send({username: req.body.username, posts: []})
  } catch (err) {
    res.status(201).send({error: err})
  }    
})

module.exports = router