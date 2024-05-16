require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const dbUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;
const apiKey = process.env.API_KEY;

// MongoDB connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Landing page route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Note Taker</h1><a href="/notes">Go to Notes Page</a>');
});

// Notes page route
app.get('/notes', (req, res) => {
  res.send(`
    <h1>Notes</h1>
    <div>
      <ul>
        <li>Note 1</li>
        <li>Note 2</li>
        <li>Note 3</li>
      </ul>
    </div>
    <div>
      <input type="text" placeholder="Enter note title">
      <textarea placeholder="Enter note text"></textarea>
      <button onclick="saveNote()">Save Note</button>
      <button onclick="clearForm()">Clear Form</button>
    </div>
  `);
});

// Save note route
app.post('/notes', (req, res) => {
  // Save the note to the database
  // Code to save the note goes here
  res.send('Note saved successfully!');
});

// Clear form route
app.post('/notes/clear', (req, res) => {
  // Clear the form fields
  res.send('Form cleared successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

