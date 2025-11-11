// server.js
import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import Faq from "./faqModel.js";
import { Contact } from "./db.js";
import News from "./newsModel.js";


const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// ---------- TEST ROUTE ----------
app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

// Get all news
app.get("/news", async (req, res) => {
  try {
    const news = await News.findAll({ order: [["date", "DESC"]] });
    res.json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Ni mogoče naložiti novic" });
  }
});

// Add news (admin only)
app.post("/news", async (req, res) => {
  try {
    const { title, link, date } = req.body;
    const newArticle = await News.create({ title, link, date });
    res.json({ success: true, news: newArticle });
  } catch (err) {
    console.error("Error creating news:", err);
    res.status(500).json({ error: "Ni mogoče dodati novice" });
  }
});

// Delete news
app.delete("/news/:id", async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "Not found" });
    await news.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting news:", err);
    res.status(500).json({ error: "Failed to delete news" });
  }
});

// ---------- CONTACT FORM ----------
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

// ---------- ADMIN MESSAGES ----------
app.get("/messages", async (req, res) => {
  try {
    const { name, email, sortBy, order } = req.query;

    const where = {};
    if (name) where.name = name;
    if (email) where.email = email;

    const orderArray = [];
    if (sortBy) orderArray.push([sortBy, order === "desc" ? "DESC" : "ASC"]);

    const messages = await Contact.findAll({
      where,
      order: orderArray.length ? orderArray : [["createdAt", "DESC"]],
    });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.delete("/messages/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const message = await Contact.findByPk(id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    await message.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

app.put("/messages/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, message } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ error: "Message not found" });

    contact.name = name;
    contact.email = email;
    contact.message = message;
    await contact.save();

    res.json({ success: true, contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update message" });
  }
});

// ---------- FAQ ----------
app.get("/faqs", async (req, res) => {
  try {
    const faqs = await Faq.findAll();
    res.json(faqs);
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

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

// ---------- START SERVER ----------
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced successfully");
    app.listen(5000, () =>
      console.log("🚀 Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("Database sync failed:", err));
