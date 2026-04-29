const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../services/cart.service");

const {
  cartItemFormatter,
  cartListFormatter,
} = require("../utils/formatters/cart.formatter");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const { success } = require("../utils/responseHandler");

const getCartController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await getCart(userId);
  success(res, cartListFormatter(cart));
});

const addToCartController = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  if (!productId) throw new AppError("no product id", 400);
  const updatedItem = await addToCart(userId, productId);
  success(res, cartItemFormatter(updatedItem), 201);
});

const removeFromCartController = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  if (!productId) throw new AppError("no product id", 400);
  const updatedItem = await removeFromCart(userId, productId);
  success(res, cartItemFormatter(updatedItem));
});

const clearCartController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await clearCart(userId);
  success(res, {});
});

module.exports = {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController,
};
