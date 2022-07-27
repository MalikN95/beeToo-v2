const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  changed: {
    type: Boolean,
    required: true,
    default: false
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String
  }
})

module.exports = mongoose.model('tasks', taskSchema)