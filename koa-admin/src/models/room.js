const mongoose = require('mongoose')

const { Schema, model } = mongoose

const roomSchema = new Schema({
  roomName: { type: String, require: true },
  areaName: { type: String, require: true },
  areaId: { type: String, required: true },
  roomImg: { type: String, require: true }
})

module.exports = model('Rooms', roomSchema)