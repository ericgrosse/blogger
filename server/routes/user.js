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

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.find({username: req.body.username})

    if(existingUser.length > 0) {
      return res.status(409).json({message: 'username already in use'})
    }
    else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({error: err})
        } else {
          const user = new User({...req.body, password: hash})
    
          try {
            let savedUser = await user.save()
            res.status(201).json(savedUser)
          } catch (err) {
            res.status(500).json({error: err})
          }  
        }
      })        
    }
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