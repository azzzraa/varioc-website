import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import Faq from "./faqModel.js";
import { Contact } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

// Save contact form message to DB
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = await Contact.create({ name, email, message });
    res.json({ success: true, contact: newContact });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// Get all contact messages (admin use)
app.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
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
  const { question, answer } = req.body;

  try {
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
