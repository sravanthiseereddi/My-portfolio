require('dotenv').config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname))); 

// Serve HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/project", (req, res) => res.sendFile(path.join(__dirname, "project.html")));
app.get("/skils", (req, res) => res.sendFile(path.join(__dirname, "skills.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "about.html")));
app.get("/feedback", (req, res) => res.sendFile(path.join(__dirname, "feedback.html")));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// Schema & Model
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  color: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", MessageSchema);

// API endpoints
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message, color } = req.body;
    const newMessage = new Message({ name, email, message, color });
    await newMessage.save();
    res.json({ success: true, msg: "Message saved!" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
