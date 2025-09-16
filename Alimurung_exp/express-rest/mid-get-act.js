// mid-get-act.js - GET requests demo (port 4000)
const express = require('express');
const app = express();
const port = 4000;

const movies = [
  { id: 1, title: 'Demon Slayer: Kimetsu No Yaiba The Movie: Infinity Castle', year: 2024 },
  { id: 2, title: 'Jujutsu Kaisen 0', year: 2021 },
  { id: 3, title: 'One Piece Film: Red', year: 2022 },
  { id: 4, title: 'Road to Ninja: Naruto the Movie', year: 2012 },
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Movies API!');
});

// GET all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// GET specific movie by id
app.get('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const movie = movies.find(m => m.id === id);
  if(!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

// Search with query parameters
app.get('/api/movies/search', (req, res) => {
  const { year, title } = req.query;
  let results = movies;
  if (year) results = results.filter(m => String(m.year) === String(year));
  if (title) results = results.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
  res.json(results);
});

app.listen(port, () => {
  console.log(`GET demo server listening at http://localhost:${port}`);
});
