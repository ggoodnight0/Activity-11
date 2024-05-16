require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Note = require('./Note');
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

// Route to get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Landing page route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Note Taker</h1><a href="/notes">Go to Notes Page</a>');
});

// Notes page route
app.get('/notes', (req, res) => {
  res.send(`
    <h1>Notes</h1>
    <div>
      <ul id="noteList">
        <li>Note 1</li>
        <li>Note 2</li>
        <li>Note 3</li>
      </ul>
    </div>
    <div>
      <input type="text" id="noteTitle" placeholder="Enter note title">
      <textarea id="noteText" placeholder="Enter note text"></textarea>
      <button id="saveNote">Save Note</button>
      <button id="clearForm">Clear Form</button>
    </div>
    <script>
      document.getElementById('saveNote').addEventListener('click', function() {
        const title = document.getElementById('noteTitle').value;
        const text = document.getElementById('noteText').value;
        fetch('/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, text })
        })
        .then(response => response.text())
        .then(data => {
          alert(data);
          document.getElementById('noteList').innerHTML += '<li>' + title + '</li>';
          document.getElementById('noteTitle').value = '';
          document.getElementById('noteText').value = '';
        });
      });

      document.getElementById('clearForm').addEventListener('click', function() {
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteText').value = '';
      });
    </script>
  `);
});

// Save note route
app.post('/notes', (req, res) => {
  // Save the note to the database
  const { title, text } = req.body;
  // Code to save the note goes here
  res.send('Note saved successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
