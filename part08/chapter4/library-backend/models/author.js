const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, "Author should be more than 4 characters."]
  },
  born: {
    type: Number,
  },
})

module.exports = mongoose.model('Author', schema)