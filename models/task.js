const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
  label: {
    type: String
  },
  text: {
    type: String
  }

})

module.exports = model('Tasks', taskSchema)