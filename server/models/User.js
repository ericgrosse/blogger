const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  posts: [{
    title: {type: String, required: true},
    content: {type: String, required: true},
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
