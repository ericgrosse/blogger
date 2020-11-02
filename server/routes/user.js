const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/:userId', async (req, res) => {
  try {
    let user = await User
    .findById(req.params.userId)
    .select('username posts')
    .populate('posts')
    .exec()
    
    res.status(200).json(user)
  }
  catch (err) {
    res.status(500).json({error: err})
  }
})

router.post('/login', async (req, res) => {
  const user = await User
  .findOne({username: req.body.username})
  .populate('posts')
  .exec()

  if (!user) {
    return res.status(401).json({message: 'authentication failed'})
  }
  
  const result = await bcrypt.compare(req.body.password, user.password)

  if(!result) {
    return res.status(401).json({message: 'authentication failed'})
  }

  res.status(200).json({
    username: user.username,
    userId: user._id,
    posts: user.posts,
  })
})

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.find({username: req.body.username})

    if(existingUser.length > 0) {
      return res.status(409).json({message: 'username already in use'})
    }

    const hash = await bcrypt.hash(req.body.password, 10)
    const user = new User({...req.body, password: hash})
    let savedUser = await user.save()
    
    res.status(201).json({
      username: savedUser.username,
      userId: savedUser._id,
      posts: savedUser.posts,
    })
  } catch(err) {
    res.status(500).json({error: err})
  }
})

router.delete('/:userId', async (req, res) => {
  try {
    await User.remove({_id: req.params.userId})
    res.status(200).json({message: 'User successfully deleted'})
  } catch (err) {
    res.status(500).json({error: err})
  }
})

module.exports = router