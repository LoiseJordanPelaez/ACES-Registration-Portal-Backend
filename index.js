const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// --- MIDDLEWARE ---
// Allows your React frontend to communicate with this backend
app.use(cors()); 
// Allows Express to read JSON data sent from the frontend
app.use(express.json()); 

// --- DATABASE CONNECTION ---
// Your specific Atlas connection string
const dbURI = "mongodb://loisejordan:loisejordan@ac-mm1uhuf-shard-00-00.wcqt4jg.mongodb.net:27017,ac-mm1uhuf-shard-00-01.wcqt4jg.mongodb.net:27017,ac-mm1uhuf-shard-00-02.wcqt4jg.mongodb.net:27017/?ssl=true&replicaSet=atlas-7hiqsm-shard-0&authSource=admin&appName=loisejordan";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas (ACES Database)"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// --- ROUTES ---
const submitRoute = require("./API/submit");
// All post requests to /submit will be handled by submit.js
app.use("/submit", submitRoute); 

// --- SERVER START ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`ACES Backend Server is running on port ${PORT}`);
});