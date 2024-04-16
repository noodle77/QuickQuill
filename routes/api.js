const express = require('express');
const router = express.Router();
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

// GET Route to retrieve saved notes
router.get('/api/notes', (req, res) => {
    // Read db.json
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// POST Route to save a new note
router.post('/api/notes', (req, res) => {
    // Read db.json
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Parse JSON data
        const notes = JSON.parse(data);

        // Generate a UUID for the new note
        const newNote = {
            id: uuid.v1(),
            title: req.body.title,
            text: req.body.text
        };
          
        // Add new note to the notes array
        notes.push(newNote);

        // Write updated notes array back to db.json
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to db.json file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            // Send new note as JSON response
            res.json(newNote);
        });
    });
});

module.exports = router;