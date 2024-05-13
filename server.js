const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Initialize the joke database as an array of objects
let db = [];

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Route to handle POST requests for adding a new joke
app.post('/', (req, res) => {
    const { title, comedian, year } = req.body;
    const id = db.length + 1; // Generate id
    const newJoke = { id, title, comedian, year };
    db.push(newJoke);
    res.json(db); // Return the entire joke database
});

// Route to handle GET requests for retrieving all jokes
app.get('/', (req, res) => {
    res.json(db);
});

// Route to handle PATCH requests for updating a joke by id
app.patch('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, comedian, year } = req.body;
    db = db.map(joke => {
        if (joke.id === id) {
            joke.title = title || joke.title;
            joke.comedian = comedian || joke.comedian;
            joke.year = year || joke.year;
        }
        return joke;
    });
    const updatedJoke = db.find(joke => joke.id === id);
    res.json(updatedJoke);
});

// Route to handle DELETE requests for deleting a joke by id
app.delete('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedJoke = db.find(joke => joke.id === id);
    db = db.filter(joke => joke.id !== id);
    res.json(deletedJoke);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
