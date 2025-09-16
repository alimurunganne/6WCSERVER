// backend/server.js
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize app
const app = express();
const PORT = 5000; // ✅ final port set here

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Needed to parse JSON body in DELETE requests

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Root route handler to fix "Cannot GET /" error
app.get("/", (req, res) => {
  res.send("Welcome to the backend API server");
});

// Add GET handler for /api/adminUpload (optional, for testing)
app.get("/api/adminUpload", (req, res) => {
  console.log("GET /api/adminUpload called");
  res.send("This is the adminUpload endpoint - POST a file here");
});

// Simulated GET student info
app.get("/api/getStudent", (req, res) => {
  const { studentID, firstName, lastName, section } = req.query;

  // In a real app you'd fetch from a database
  res.json({
    studentID,
    firstName,
    lastName,
    section,
    status: "Fetched successfully",
  });
});

// File Upload Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to uploads/ folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// POST: Admin file upload
app.post("/api/adminUpload", upload.single("file"), (req, res) => {
  try {
    console.log("Form data:", req.body);
    console.log("Uploaded file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// DELETE: Simulated delete for student
app.delete("/api/deleteStudent", (req, res) => {
  const { studentID } = req.body || {};

  if (!studentID) {
    return res.status(400).json({ error: "Missing studentID" });
  }

  console.log(`Student record deletion requested: ID = ${studentID}`);
  res.json({ message: "Student record deleted successfully" });
});

// Add GET handler to avoid "Cannot GET /api/deleteStudent" error on browser visit
app.get("/api/deleteStudent", (req, res) => {
  console.log("GET /api/deleteStudent called");
  res.send("DELETE /api/deleteStudent expects a DELETE request with studentID in the JSON body.");
});

// DELETE: Simulated delete for admin
app.delete("/api/deleteAdmin", (req, res) => {
  const { adminID } = req.body || {};

  if (!adminID) {
    return res.status(400).json({ error: "Missing adminID" });
  }

  console.log(`Admin record deletion requested: ID = ${adminID}`);
  res.json({ message: "Admin record deleted successfully" });
});

// Add GET handler to avoid "Cannot GET /api/deleteAdmin" error on browser visit
app.get("/api/deleteAdmin", (req, res) => {
  console.log("GET /api/deleteAdmin called");
  res.send("DELETE /api/deleteAdmin expects a DELETE request with adminID in the JSON body.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
