const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  phoneNum: { type: String, required: true }
})

module.exports = model('Users', userSchema)