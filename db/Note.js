const mongoose = require('mongoose');

// Define the Note schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

// Create the Note model using the schema
const Note = mongoose.model('Note', noteSchema);

// Export the Note model
module.exports = Note;
