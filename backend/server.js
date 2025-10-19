import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import Faq from "./faqModel.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

// Contact endpoint
app.post("/contact", (req, res) => {
  console.log("Contact form received:", req.body);
  res.json({ success: true });
});

// Get all FAQs
app.get("/faqs", async (req, res) => {
  try {
    const faqs = await Faq.findAll();
    res.json(faqs);
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

// Add new FAQ
app.post("/faqs", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = await Faq.create({ question, answer });
    res.json(faq);
  } catch (err) {
    console.error("Error creating FAQ:", err);
    res.status(500).json({ error: "Failed to create FAQ" });
  }
});

// Start server
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced successfully");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch((err) => console.error("Database sync failed:", err));
