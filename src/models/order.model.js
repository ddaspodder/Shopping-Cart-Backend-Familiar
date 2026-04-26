const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      itemTotal: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
  orderDate: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
