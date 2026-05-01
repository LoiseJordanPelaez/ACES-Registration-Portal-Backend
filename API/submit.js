const express = require("express");
const router = express.Router();
const Form = require("../Models/form");

// POST /submit
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // ✅ REQUIRED FIELDS CHECK
    const requiredFields = [
      "mainCategory",
      "subCategory",
      "name",
      "section",
      "team",
      "contact",
      "gmail",
      "submissionLink"
    ];

    for (let field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === "") {
        return res.status(400).json({
          message: `Missing required field: ${field}`
        });
      }
    }

    // ✅ CONTACT VALIDATION (PH format)
    if (!/^\+639\d{9}$/.test(data.contact)) {
      return res.status(400).json({
        message: "Invalid contact number format. Use +639XXXXXXXXX"
      });
    }

    // ✅ EMAIL VALIDATION
    if (!data.gmail.toLowerCase().endsWith("@gmail.com")) {
      return res.status(400).json({
        message: "Only @gmail.com emails are allowed"
      });
    }

    // ✅ CREATE DOCUMENT
    const newEntry = new Form({
      mainCategory: data.mainCategory,
      subCategory: data.subCategory,
      groupType: data.groupType || "",

      name: data.name,
      section: data.section,
      team: data.team,
      contact: data.contact,
      gmail: data.gmail,

      role: data.role || "",
      position: data.position || "",
      jersey: data.jersey || "",
      matchType: data.matchType || "",
      ign: data.ign || "",
      esportsRole: data.esportsRole || "",
      bandName: data.bandName || "",
      instrument: data.instrument || "",
      artType: data.artType || "",
      quizCategory: data.quizCategory || "",
      essayLanguage: data.essayLanguage || "",

      submissionLink: data.submissionLink
    });

    // ✅ SAVE TO MONGODB
    const saved = await newEntry.save();

    console.log("✅ SAVED:", saved._id);

    res.status(201).json({
      message: "🏆 Registration saved successfully!",
      id: saved._id
    });

  } catch (error) {
    console.error("❌ ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;
