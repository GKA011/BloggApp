const mongoose = require("mongoose");

// Replace '<YOUR_CONNECTION_STRING>' with your MongoDB connection string
mongoose
  .connect("mongodb+srv://gourikani:GoUrIkAnI@cluster0.cki9m4b.mongodb.net/projectDB?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {7
    console.log(error);
  });