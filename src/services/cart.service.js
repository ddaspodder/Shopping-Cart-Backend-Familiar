const AppError = require("../utils/appError");
const Cart = require("../models/cart.model");

const getCart = async (userId) => {
  return await Cart.find({ userId });
};

const addToCart = async (userId, productId) => {
  const cartItem = await Cart.findOne({ userId, productId });

  let newCartItem = {};
  if (!cartItem) {
    newCartItem = await Cart.create({ userId, productId, quantity: 1 });
  } else {
    newCartItem = await Cart.findOneAndUpdate(
      { userId, productId },
      { $inc: { quantity: 1 } },
      { returnDocument: "after" },
    );
  }

  return newCartItem;
};

const removeFromCart = async (userId, productId) => {
  const cartItem = await Cart.findOne({ userId, productId });
  if (!cartItem) throw new AppError("Item no longer exist", 404);

  let newCartItem = {};
  if (cartItem.quantity === 1)
    await Cart.findOneAndDelete({ userId, productId });
  else
    newCartItem = await Cart.findOneAndUpdate(
      { userId, productId },
      { $dec: { quantity: 1 } },
      { returnDocument: "after" },
    );

  return newCartItem;
};

const clearCart = async (userId) => {
  return await Cart.deleteMany({ userId });
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
