const AppError = require("../utils/appError");
const { getData, save } = require("../utils/readWriteHandler");

const CART_FILE = "cart.json";

const getCart = () => {
  return getData(CART_FILE);
};

const addToCart = async (productId) => {
  const cart = await getData(CART_FILE);
  const cartItem = cart.find((item) => item.productId === productId);
  let newCart = [];
  if (!cartItem) newCart = [...cart, { productId, quantity: 1 }];
  else {
    newCart = cart.map((item) => {
      if (item.productId === cartItem.productId)
        return { ...item, quantity: item.quantity + 1 };
      return item;
    });
  }
  await save(CART_FILE, newCart);
  const updatedItem = newCart.find((item) => item.productId === productId);
  return updatedItem;
};

const removeFromCart = async (productId) => {
  const cart = await getData(CART_FILE);
  const cartItem = cart.find((item) => item.productId === productId);
  let newCart = [];
  if (!cartItem) throw new AppError("Item no longer exist", 404);

  if (cartItem.quantity == 1)
    newCart = cart.filter((item) => item.productId !== productId);
  else
    newCart = cart.map((item) => {
      if (item.productId === productId)
        return { ...item, quantity: item.quantity - 1 };
      return item;
    });

  await save(CART_FILE, newCart);
  const updatedItem = newCart.find((item) => item.productId === productId);
  return updatedItem;
};

const clearCart = async () => {
  return await save(CART_FILE, []);
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
