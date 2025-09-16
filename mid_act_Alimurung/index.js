// index.js (as ES module)
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello from Express + Vue!');
});

app.get('/api/items', (req, res) => {
  res.json([
    { id: 1, name: 'First item from my server' },
    { id: 2, name: 'Another cool item' },
    { id: 3, name: 'Learning Vue is fun!' },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
