const mongoose = require('mongoose');

// Define the schema
const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

// Create a model from the schema
const Post = mongoose.model('Post', schema);

// Export the model
module.exports = Post;
