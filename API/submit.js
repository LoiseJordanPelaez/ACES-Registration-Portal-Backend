router.post("/", async (req, res) => {
  console.log("📥 Incoming Data:", req.body); // Check if this prints in your console!

  try {
    const data = req.body;

    // 1. Validation Logic (Keep your existing checks here...)
    const requiredFields = ["mainCategory", "subCategory", "name", "section", "team", "contact", "gmail", "submissionLink"];
    for (let field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === "") {
        console.log(`⚠️ Validation Failed: Missing ${field}`);
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // 2. Create the Document
    const newEntry = new Form(data); // Mongoose will ignore fields not in Schema

    // 3. Save
    const saved = await newEntry.save();
    console.log("✅ Database Save Successful:", saved._id);

    res.status(201).json({
      message: "🏆 Registration saved successfully!",
      id: saved._id
    });

  } catch (error) {
    console.error("❌ Mongoose Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
