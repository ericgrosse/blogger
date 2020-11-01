const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = express.Router()

router.post('/', async (req, res) => {
  const post = new Post(req.body)

  try {
    let savedPost = await post.save()
    let foundUser = await User.findById(savedPost.userId)
    foundUser.posts = [...foundUser.posts, savedPost._id]
    await foundUser.save()

    res.status(201).end()
  } catch (err) {
    res.status(500).json({error: err})
  }    
})

module.exports = router