const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/register', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).end()
  } catch (err) {
    res.status(201).json({error: err})
  }    
})

module.exports = router