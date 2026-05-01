const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express(); 
const server = http.createServer(app); 

// --- MIDDLEWARE ---
app.use(cors({
    origin: "https://aces-week-portal-frontend.onrender.com"
})); // Enable CORS

// Use Regex literal to bypass Express 5 / path-to-regexp string errors
app.options(/.* / , (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://aces-week-portal-frontend.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
}); // Handle Preflight

app.use(express.json()); // Parse JSON

// --- DATABASE CONNECTION ---
const dbURI = "mongodb://loisejordan:loisejordan@ac-mm1uhuf-shard-00-00.wcqt4jg.mongodb.net:27017,ac-mm1uhuf-shard-00-01.wcqt4jg.mongodb.net:27017,ac-mm1uhuf-shard-00-02.wcqt4jg.mongodb.net:27017/?ssl=true&replicaSet=atlas-7hiqsm-shard-0&authSource=admin&appName=loisejordan";

mongoose 
    .connect(dbURI) 
    .then(() => console.log("Connected to MongoDB Atlas (ACES Database)")) // Success log
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message); // Error log
        process.exit(1); 
    });

// --- ROUTES ---
app.get('/', (req, res) => {
    res.send("ACES Week Portal API is online.");
}); // Health check

const submitForm = require('./API/submit'); // Import route
app.use("/submit", submitForm); // Mount route

// --- START SERVER ---
const PORT = process.env.PORT || 8080; // Assign port

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
}); // Start server
