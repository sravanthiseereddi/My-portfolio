require('dotenv').config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ==== Middleware ====
app.use(cors());
app.use(express.json()); // Parse JSON
app.use(express.static(path.join(__dirname))); // Serve static files

// ==== MongoDB Connection ====
const MONGO_URI = process.env.MONGO_URI || 
  "mongodb+srv://feedbacks:feedback123@cluster0.yjno4lb.mongodb.net/portfolio?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ==== Schema & Model ====
const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  color: String,
  createdAt: { type: Date, default: Date.now, immutable: true }
});

const Message = mongoose.model("Message", MessageSchema);

// ==== API Endpoints ====

// Save new message
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message, color } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const newMessage = new Message({ name, email, message, color });
    await newMessage.save();
    console.log("Saved message:", newMessage);
    res.json({ success: true, msg: "Message saved!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all messages
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // newest first
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==== Serve HTML Pages ====
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/feedback", (req, res) => res.sendFile(path.join(__dirname, "feedback.html")));
app.get("/project", (req, res) => res.sendFile(path.join(__dirname, "project.html")));
app.get("/skills", (req, res) => res.sendFile(path.join(__dirname, "skills.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "about.html")));

// ==== Start Server ====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
