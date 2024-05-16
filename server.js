require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Note = require('./Note');
const app = express();
const PORT = process.env.PORT || 3000;

const dbUrl = process.env.DATABASE_URL;

// MongoDB connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middleware to parse JSON bodies
app.use(express.json());

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
app.get('/notes-page', (req, res) => {
  res.send(`
    <h1>Notes</h1>
    <div>
      <ul id="noteList">
        <!-- Existing notes will be dynamically added here -->
      </ul>
    </div>
    <div>
      <input type="text" id="noteTitle" placeholder="Enter note title">
      <textarea id="noteText" placeholder="Enter note text"></textarea>
      <button id="saveNote">Save Note</button>
      <button id="clearForm">Clear Form</button>
    </div>
    <script>
      // Your client-side JavaScript code here
    </script>
  `);
});

// Save note route
app.post('/notes', async (req, res) => {
  try {
    const { title, text } = req.body;
    const newNote = new Note({ title, text });
    await newNote.save();
    res.send('Note saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
