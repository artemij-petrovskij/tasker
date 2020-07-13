const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }

})

module.exports = model('Tasks', taskSchema)