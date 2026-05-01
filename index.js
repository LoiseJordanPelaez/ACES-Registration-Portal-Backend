const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express(); 
const server = http.createServer(app); 

// --- MIDDLEWARE ---
// Enables Cross-Origin Resource Sharing for your specific frontend URL
app.use(cors({
    origin: "https://aces-week-portal-frontend.onrender.com"
})); 

// Configures pre-flight requests to handle CORS headers for browser security
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://aces-week-portal-frontend.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});

// Parses incoming JSON data
app.use(express.json());

// --- DATABASE CONNECTION ---
// Connection string for the ACES Database cluster
const dbURI = "mongodb://loisejordan:loisejordan@ac-mm1uhuf-shard-00-00.wcqt4jg.mongodb.net:27017,ac-mm1uhuf-shard-00-01.wcqt4jg.mongodb.net:27017,ac-mm1uhuf-shard-00-02.wcqt4jg.mongodb.net:27017/?ssl=true&replicaSet=atlas-7hiqsm-shard-0&authSource=admin&appName=loisejordan";

mongoose 
    .connect(dbURI) 
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); 
    });

// --- ROUTES ---
// Health check route for the server root
app.get('/', (req, res) => {
    res.send("ACES Week Portal API is online.");
});

// Mounts the submission logic to the /submit endpoint
const submitForm = require('./API/submit');
app.use("/submit", submitForm);

// --- START SERVER ---
// Assigns the port from environment variables or defaults to 8080
const PORT = process.env.PORT || 8080; 

// Listens on 0.0.0.0 to ensure the service is reachable on the internet
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
