const express = require("express");
const cors = require("cors");
const mongoose = require("./connection"); // Import the connection file
const Post = require("./model"); // Import the model file

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// POST API to add a new blog entry
app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;

    // Create a new post entry
    const newPost = new Post({
      title,
      content,
      img_url,
    });

    // Save to the database
    await newPost.save();

    res.status(201).send({ message: "Post entry added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding post entry" });
  }
});

// GET API to retrieve all blog entries
app.get("/get", async (req, res) => {
  try {
    let data = await Post.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error retrieving post entries" });
  }
});

// PUT API to update a blog entry
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, img_url } = req.body;

    // Find the post by ID and update it
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, img_url }, { new: true });

    if (!updatedPost) {
      return res.status(404).send({ message: "Post entry not found" });
    }

    res.send({ message: "Post entry updated successfully", updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating post entry" });
  }
});

// DELETE API to delete a blog entry
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).send({ message: "Post entry not found" });
    }

    res.send({ message: "Post entry deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting post entry" });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
