const express = require("express");
const router = express.Router();
const Form = require("../Models/form");

// POST /submit
router.post("/", async (req, res) => {
  console.log("📥 Incoming Data:", req.body);

  try {
    const data = req.body;

    // 1. Validation
    const requiredFields = ["mainCategory", "subCategory", "name", "section", "team", "contact", "gmail", "submissionLink"];
    for (let field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === "") {
        return res.status(400).json({ message: `Missing field: ${field}` });
      }
    }

    // 2. Format & Save
    const newEntry = new Form(data);
    const saved = await newEntry.save();

    console.log("✅ Saved to MongoDB ID:", saved._id);
    res.status(201).json({ message: "Success!", id: saved._id });

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// VERY IMPORTANT: You must export the router at the end
module.exports = router;
