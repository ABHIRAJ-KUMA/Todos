const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
});

module.exports = mongoose.model("Todo", todoSchema);
