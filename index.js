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

app.options("/:path*", (req, res) => {
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
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); 
    });

// --- ROUTES ---
app.get('/', (req, res) => {
    res.send("ACES Week Portal API is online.");
});

const submitForm = require('./API/submit'); 
app.use("/submit", submitForm); 

// --- START SERVER ---
const PORT = process.env.PORT || 8080; 

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
