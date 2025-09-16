import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for form data
app.use(express.urlencoded({ extended: true }));

// Setup Multer storage for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Save to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Adding timestamp to filename
    },
});

const upload = multer({ storage: storage });

// Routes to serve pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));  // Serving home.html
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'student.html'));  // Serving student.html
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin.html'));  // Serving admin.html
});

// Handle POST request for the admin form
app.post('/api/postAdmin', (req, res) => {
    const { adminID, firstName, lastName, department } = req.body;
    console.log('Admin Data:', { adminID, firstName, lastName, department });

    res.json({
        message: 'Admin data received successfully!',
        data: { adminID, firstName, lastName, department },
    });
});

// Handle the POST request for file upload
app.post('/adminUpload', upload.single('file'), (req, res) => {
    try {
        const { adminID, firstName, lastName, department } = req.body;
        const uploadedFile = req.file;

        if (!uploadedFile) {
            return res.status(400).send('No file was uploaded.');
        }

        console.log('Admin Data:', { adminID, firstName, lastName, department });
        console.log(`File uploaded: ${uploadedFile.path}`);

        res.send('File and form data uploaded successfully');
    } catch (err) {
        console.error('Error in /adminUpload route:', err);
        res.status(500).send('Error processing submission.');
    }
});


// Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
