const express = require("express");
const router = express.Router();
const Form = require("../Models/form"); // Fixed path casing

router.post("/", async (req, res) => {
    try {
        const {
            mainCategory, subCategory, groupType,
            name, section, team, contact, gmail,
            role, position, jersey, matchType, ign, 
            esportsRole, bandName, instrument, artType, 
            quizCategory, essayLanguage, submissionLink
        } = req.body;

        if (!name || !contact || !gmail || !mainCategory || !subCategory || !submissionLink) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newEntry = new Form({
            mainCategory, subCategory, groupType,
            name, section, team, contact, gmail,
            role, position, jersey, matchType, ign, 
            esportsRole, bandName, instrument, artType, 
            quizCategory, essayLanguage, submissionLink
        });

        await newEntry.save(); 

        res.status(201).json({ message: "🏆 REGISTRATION SUBMITTED SUCCESSFULLY!" });

    } catch (error) {
        res.status(500).json({ message: "Database Error", error: error.message });
    }
});

module.exports = router;
