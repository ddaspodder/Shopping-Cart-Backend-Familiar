const AppError = require("../utils/appError");
const Cart = require("../models/cart.model");
const { getProductById } = require("./product.service");

const getCart = async () => {
  return await Cart.find();
};

const addToCart = async (productId) => {
  const cartItem = await Cart.findOne({ productId });

  let newCartItem = {};
  if (!cartItem) {
    newCartItem = await Cart.create({ productId, quantity: 1 });
  } else {
    newCartItem = await Cart.findOneAndUpdate(
      { productId },
      { quantity: cartItem.quantity + 1 },
      { new: true },
    );
  }

  return newCartItem;
};

const removeFromCart = async (productId) => {
  const product = await getProductById(productId);
  if (!product) throw new AppError("product doesnt exist", 404);

  const cartItem = await Cart.findOne({ productId });
  if (!cartItem) throw new AppError("Item no longer exist", 404);

  let newCartItem = {};
  if (cartItem.quantity === 1) await Cart.findOneAndDelete({ productId });
  else
    newCartItem = await Cart.findOneAndUpdate(
      { productId },
      { quantity: cartItem.quantity - 1 },
      { new: true },
    );

  return newCartItem;
};

const clearCart = async () => {
  return await Cart.deleteMany({});
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
