const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Helper function to read and write data
const readData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data, null, 2));
};

// GET /api/notes - Retrieve all notes
router.get('/notes', (req, res) => {
  const notes = readData();
  res.json(notes);
});

// POST /api/notes - Create a new note
router.post('/notes', (req, res) => {
  const notes = readData();
  const newNote = { id: Date.now().toString(), ...req.body };
  notes.push(newNote);
  writeData(notes);
  res.json(newNote);
});

// DELETE /api/notes/:id - Delete a note
router.delete('/notes/:id', (req, res) => {
  let notes = readData();
  notes = notes.filter((note) => note.id !== req.params.id);
  writeData(notes);
  res.json({ ok: true });
});

module.exports = router;
