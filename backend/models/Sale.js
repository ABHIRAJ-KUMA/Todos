const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  store: { type: String, required: true },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ]
});

module.exports = mongoose.model("Sale", saleSchema);
