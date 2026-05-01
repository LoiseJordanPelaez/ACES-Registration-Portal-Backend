const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON

// --- DATABASE CONNECTION ---
const dbURI = "mongodb://loisejordan:loisejordan@ac-mm1uhuf-shard-00-00.wcqt4jg.mongodb.net:27017,ac-mm1uhuf-shard-00-01.wcqt4jg.mongodb.net:27017,ac-mm1uhuf-shard-00-02.wcqt4jg.mongodb.net:27017/?ssl=true&replicaSet=atlas-7hiqsm-shard-0&authSource=admin&appName=loisejordan";

mongoose.connect(dbURI)
.then(() => console.log("Connected to MongoDB Atlas (ACES Database)")) // Success log
.catch((err) => console.error("MongoDB Connection Error:", err)); // Error log

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('Server is running successfully!'); // Health check
});

const submitRoute = require("./API/submit"); // Import route
app.use("/submit", submitRoute); // Mount route

// --- SERVER START ---
const PORT = process.env.PORT || 8080; // Assign port
app.listen(PORT, () => {
    console.log(`ACES Backend Server is running on port ${PORT}`); // Start server
});
