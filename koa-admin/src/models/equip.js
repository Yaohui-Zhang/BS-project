const mongoose = require('mongoose')

const { Schema, model } = mongoose

const equipSchema = new Schema({
  equipName: { type: String, required: true },
  equipType: { type: Number, required: true },
  equipDesc: { type: String, required: true },
  equipAttrs: [{
    type: Object, require: true
  }],
  room: { type: String, required: true },
  isMounted: { type: Boolean, require: true },
  x: { type: Number, require: true },
  y: { type: Number, require: true }
})

module.exports = model('equips', equipSchema)