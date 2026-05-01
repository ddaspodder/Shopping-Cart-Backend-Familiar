const AppError = require("../utils/appError");
const Cart = require("../models/cart.model");
const { getProductById, getActiveProductById } = require("./product.service");

const getCart = async (userId) => {
  const cart = await Cart.find({ userId });
  //later check how to do this in SQL

  const extendedCart = await Promise.all(
    cart.map(async (cartItem) => {
      const product = await getProductById(cartItem.productId);
      return { cartItem, isActive: product.isActive };
    }),
  );

  const inactiveProductIds = extendedCart
    .filter((item) => item.isActive)
    .map(({ cartItem }) => cartItem.productId);

  Cart.deleteMany({ userId, productId: { $in: inactiveProductIds } });

  const activeCartItems = extendedCart
    .filter((item) => item.isActive)
    .map(({ cartItem }) => cartItem);

  return activeCartItems;
};

const addToCart = async (userId, productId) => {
  await getActiveProductById(productId);

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
  await getActiveProductById(productId);

  const cartItem = await Cart.findOne({ userId, productId });
  if (!cartItem) throw new AppError("Item no longer exist", 404);

  let newCartItem = {};
  if (cartItem.quantity === 1)
    await Cart.findOneAndDelete({ userId, productId });
  else
    newCartItem = await Cart.findOneAndUpdate(
      { userId, productId },
      { $inc: { quantity: -1 } },
      { returnDocument: "after" },
    );

  return newCartItem;
};

const clearCart = async (userId) => {
  return await Cart.deleteMany({ userId });
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
