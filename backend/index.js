const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/usermodel");
const { authenticateToken } = require("./utilites");
const Note = require("./models/notemodal");
const { message } = require("prompt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//connect to database
mongoose.connect(process.env.MONOGO_URI);

//routes
app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const user = new User({ name, email, password });
      await user.save();
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.json({
        error: false,
        user,
        accessToken,
        message: "Account created successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      error: false,
      user,
      accessToken,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get user
app.get("/get-user", authenticateToken, async (req, res) => {
  const user = req.user;
  
  const isUser = await User.findOne({ email: user.email });

  if (!isUser) {
    return res.status(400).json({ error: "User Not Found" });
  }

  return res.json({
    user: {
      name: isUser.name,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "User fetched successfully",
  })
  

})



//Add a new post
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.user._id; // Ensure user ID is properly set
  if (!title || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const note = new Note({
      title,
      description,
      tags: tags || [],
      userId: userId, // Use the extracted user ID
    });
    await note.save();

    return res.json({
      note,
      message: "Post created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

//Edit a post
app.put("/edit-note/:id", authenticateToken, async (req, res) => {
  const { title, description, tags, isPinned } = req.body;
  const noteId = req.params.id;
  const { user } = req.user;

  if (!title || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user.email }); // Ensure user ID is properly set
    if (!note) {
      return res.status(404).json({ error: "Post not found" });
    }

    note.title = title;
    note.description = description;
    note.tags = tags || [];
    note.isPinned = isPinned;

    await note.save();

    return res.json({
      note,
      message: "Post updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

//Get all posts
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const userId = req.user.email; // Correctly access the user ID

  try {
    //find and sort by date or ispinned
    const notes = await Note.find({ userId: userId }).sort({ createdAt: -1 });
    console.log(userId);
    console.log(req.user);

    return res.json({
      notes,
      message: "All posts fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

//Delete a post
app.delete("/delete-note/:id", authenticateToken, async (req, res) => {
  const noteId = req.params.id;
  const user  = req.user;

  try {
    const note = await Note.findOne({ _id: noteId , userId: user.email}); // Ensure user ID is properly set
    console.log(user);
    if (!note) {
      return res.status(404).json({ error: "Post not found" });
    }

    await note.deleteOne({_id: noteId , userId: user.email}); // Ensure user ID is properly set
    return res.json({
      message: "Post deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// update isPinned
app.put("/update-pinned/:id", authenticateToken, async (req, res) => {
  
  const { isPinned } = req.body;
  const noteId = req.params.id;
  const user = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user.email }); // Ensure user ID is properly set
    if (!note) {
      return res.status(404).json({ error: "Post not found" });
    }

    if(isPinned) note.isPinned = isPinned;
    

    await note.save();

    return res.json({
      note,
      message: "Note pinned successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

})

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// module.exports = app
