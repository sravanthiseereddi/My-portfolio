require('dotenv').config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();


app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname))); 

const MONGO_URI = process.env.MONGO_URI || 
  "mongodb+srv://feedbacks:feedback123@cluster0.yjno4lb.mongodb.net/portfolio?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  color: String,
  createdAt: { type: Date, default: Date.now, immutable: true }
});

const Message = mongoose.model("Message", MessageSchema);


app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message, color } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const newMessage = new Message({ name, email, message, color });
    await newMessage.save();
   
    res.json({ success: true, msg: "Message saved!" });
  } catch (error) {
    
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // newest first
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/feedback", (req, res) => res.sendFile(path.join(__dirname, "feedback.html")));
app.get("/project", (req, res) => res.sendFile(path.join(__dirname, "project.html")));
app.get("/skills", (req, res) => res.sendFile(path.join(__dirname, "skills.html")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
