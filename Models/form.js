const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    // Core Selection
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    groupType: { type: String, default: "" },

    // Participant Details
    name: { type: String, required: true },
    section: { type: String, required: true },
    team: { type: String, required: true },
    contact: { type: String, required: true },
    gmail: { type: String, required: true },

    // Dynamic Fields (Not required because they depend on the category)
    role: { type: String, default: "" },
    position: { type: String, default: "" },
    jersey: { type: String, default: "" },
    matchType: { type: String, default: "" },
    ign: { type: String, default: "" },
    esportsRole: { type: String, default: "" },
    bandName: { type: String, default: "" },
    instrument: { type: String, default: "" },
    artType: { type: String, default: "" },
    quizCategory: { type: String, default: "" },
    essayLanguage: { type: String, default: "" },

    // Requirements
    submissionLink: { type: String, required: true },

    // Timestamp
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AcesRegistration", formSchema);