const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/:userId', async (req, res) => {
  try {
    let user = await User
    .findById(req.params.userId)
    .select('username posts')
    //.populate('something')
    .exec()
    
    res.status(200).json(user)
  }
  catch (err) {
    res.status(500).json({error: err})
  }
})

router.post('/register', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).end()
  } catch (err) {
    res.status(500).json({error: err})
  }    
})

module.exports = router