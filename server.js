const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "PORTFOLIO"))); // serve frontend

// ✅ Connect to MongoDB (replace with your Mongo URI if using Atlas)
mongoose.connect("mongodb+srv://feedbacks:feedback123@cluster0.yjno4lb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Schema
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  color: String,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", MessageSchema);

// ✅ Save message
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

// ✅ Get all messages
app.get("/api/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// Start server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
