// index.js - Express REST demo (port 3000)
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // enable JSON parsing for potential POSTs

app.get('/', (req, res) => {
  res.send('Express REST API Running');
});

const heroes = [
  { id: 1, name: 'Batman', universe: 'DC', power: 'Wealth/Detective' },
  { id: 2, name: 'Superman', universe: 'DC', power: 'Flight/Strength' },
  { id: 3, name: 'Spider-Man', universe: 'Marvel', power: 'Agility/SpiderSense' },
  { id: 4, name: 'Iron Man', universe: 'Marvel', power: 'Armored Suit/Tech' },
];

// GET all heroes
app.get('/api/heroes', (req, res) => {
  res.json(heroes);
});

// GET by route parameter (id or name)
app.get('/api/heroes/:identifier', (req, res) => {
  const { identifier } = req.params;
  const found = heroes.find(h => String(h.id) === identifier || h.name.toLowerCase() === identifier.toLowerCase());
  if (!found) return res.status(404).json({ error: 'Hero not found' });
  res.json(found);
});

// Multi params 
app.get('/api/heroes/:hero/:universe', (req, res) => {
  const { hero, universe } = req.params;
  res.json({ hero, universe });
});

// Query parameters 
app.get('/api/heroes/search', (req, res) => {
  const { universe, name } = req.query;
  let results = heroes;
  if (universe) results = results.filter(h => h.universe.toLowerCase() === universe.toLowerCase());
  if (name) results = results.filter(h => h.name.toLowerCase().includes(name.toLowerCase()));
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
