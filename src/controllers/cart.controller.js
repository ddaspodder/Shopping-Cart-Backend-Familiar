const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../services/cart.service");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const { success } = require("../utils/responseHandler");

const getCartController = asyncHandler(async (req, res) => {
  const cart = await getCart();
  success(res, cart);
});

const addToCartController = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) throw new AppError("no product id", 400);
  const updatedItem = await addToCart(productId);
  success(res, updatedItem, 201);
});

const removeFromCartController = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) throw new AppError("no product id", 400);
  const updatedItem = await removeFromCart(productId);
  success(res, updatedItem);
});

const clearCartController = asyncHandler(async (req, res) => {
  await clearCart();
  success(res, {});
});

module.exports = {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController,
};
