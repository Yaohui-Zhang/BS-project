const mongoose = require('mongoose')

const { Schema, model } = mongoose

const areaSchema = new Schema({
  areaName: { type: String, required: true },
  areaPosition: { type: String, required: true },
  rooms: {
    type: [{ type: Schema.Types.ObjectId }],
    ref: 'Rooms',
  }
})

module.exports = model('Areas', areaSchema)