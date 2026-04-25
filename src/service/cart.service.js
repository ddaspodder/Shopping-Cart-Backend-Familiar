const AppError = require("../lib/appError");
const { getData, save } = require("../lib/readWriteHandler");

const CART_PATH = "src/lib/cart.json";

const getCart = () => {
  return getData(CART_PATH);
};

const addToCart = async (productId) => {
  const cart = await getData(CART_PATH);
  const cartItem = cart.find((item) => item.productId === productId);
  let newCart = [];
  if (!cartItem) newCart = [...cart, { productId, quantity: 1 }];
  else {
    newCart = cart.map((item) => {
      if (item.productId === cartItem.productId) item.quantity++;
      return item;
    });
  }
  await save(CART_PATH, newCart);
  const updatedItem = newCart.find((item) => item.productId === productId);
  return updatedItem;
};

const removeFromCart = async (productId) => {
  const cart = await getData(CART_PATH);
  const cartItem = cart.find((item) => item.productId === productId);
  let newCart = [];
  if (!cartItem) throw new AppError("Item no longer exist", 404);

  if (cartItem.quantity == 1)
    newCart = cart.filter((item) => item.productId !== productId);
  else
    newCart = cart.map((item) => {
      if (item.productId === productId) item.quantity--;
      return item;
    });

  await save(CART_PATH, newCart);
  const updatedItem = newCart.find((item) => item.productId === productId);
  return updatedItem;
};

const clearCart = async () => {
  await save(CART_PATH, []);
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
