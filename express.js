import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Middleware
app.use(express.urlencoded({ extended: true })); // To handle form data

// Page Routes (use GET for static page routes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/home.html'));
});

app.get('/student', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/student.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/admin.html'));
});

// API Routes (use GET to fetch query parameters)
app.get('/api/getStudent', (req, res) => {
  const { studentID, firstName, lastName, section } = req.query;
  res.json({ studentID, firstName, lastName, section });
});

app.get('/api/getAdmin', (req, res) => {
  const { adminID, firstName, lastName, department } = req.query;
  res.json({ adminID, firstName, lastName, department });
});

// Handle the POST request from the admin form
app.post('/api/postAdmin', (req, res) => {
  const { adminID, firstName, lastName, department } = req.body;
  // Simulate saving the admin data (you can add database logic here)
  console.log('Admin Data:', { adminID, firstName, lastName, department });

  // Send a response back to the client
  res.json({
    message: 'Admin data received successfully!',
    data: { adminID, firstName, lastName, department }
  });
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
