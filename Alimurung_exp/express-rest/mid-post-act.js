const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Movie POST API!');
});

let movies = [
  { id: 1, title: 'Demon Slayer: Kimetsu No Yaiba The Movie: Infinity Castle', year: 2024 },
  { id: 2, title: 'Jujutsu Kaisen 0', year: 2021 },
];

app.get('/api/movies', (req, res) => res.json(movies));

app.post('/api/movies', (req, res) => {
  const { title, year } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newMovie = {
    id: movies.length ? movies[movies.length - 1].id + 1 : 1,
    title,
    year: year || null,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.post('/api/movies/validate', (req, res) => {
  const { title } = req.body;
  if (!title || title.length < 2) {
    return res.status(400).json({ error: 'Title must be at least 2 characters' });
  }
  res.json({ success: true, message: 'Validated' });
});

app.listen(port, () => console.log(`POST demo server running on http://localhost:${port}`));
