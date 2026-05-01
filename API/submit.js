const express = require("express");
const router = express.Router();

// 1. Import your Mongoose model (ensure the path matches your folder structure)
const Form = require("../models/form"); 

router.post("/", async (req, res) => {
    try {
        // Destructure all possible fields sent from the React frontend
        const {
            mainCategory, subCategory, groupType,
            name, section, team, contact, gmail,
            role, position, jersey, matchType, ign, 
            esportsRole, bandName, instrument, artType, 
            quizCategory, essayLanguage, submissionLink
        } = req.body;

        // --- 2. BASIC VALIDATION ---
        // Safety check to ensure the core fields aren't empty before hitting the database
        if (!name || !contact || !gmail || !mainCategory || !subCategory || !submissionLink) {
            return res.status(400).json({ 
                message: "Missing required fields. Please ensure the form is completely filled out." 
            });
        }

        console.log(`🛡️ INCOMING REGISTRATION: ${name} | ${mainCategory} - ${subCategory}`);

        // --- 3. DATABASE LOGIC ---
        // Create a new document using the extracted data
        const newEntry = new Form({
            mainCategory, subCategory, groupType,
            name, section, team, contact, gmail,
            role, position, jersey, matchType, ign, 
            esportsRole, bandName, instrument, artType, 
            quizCategory, essayLanguage, submissionLink
        });

        // Save it to your MongoDB Atlas cluster
        await newEntry.save(); 

        // --- 4. SUCCESS RESPONSE ---
        res.status(201).json({ 
            message: "🏆 REGISTRATION SUBMITTED SUCCESSFULLY!",
            receivedData: name 
        });

    } catch (error) {
        console.error("❌ SUBMISSION ERROR:", error.message);
        
        res.status(500).json({ 
            message: "Internal Server Error. Could not save registration to the database.",
            error: error.message 
        });
    }
});

module.exports = router;