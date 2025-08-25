const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "PORTFOLIO"))); 


mongoose.connect("mongodb+srv://feedbacks:feedback123@cluster0.yjno4lb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));


const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  color: String,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", MessageSchema);


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
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});


app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on http://192.168.1.25:5000");
});

