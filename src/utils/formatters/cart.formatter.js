const cartItemFormatter = (cart) => {
  if (!cart || !cart._id) return {};
  return {
    id: cart._id.toString(),
    productId: cart.productId,
    quantity: cart.quantity,
  };
};

const cartListFormatter = (cartItems) => {
  return cartItems.map(cartItemFormatter);
};

module.exports = { cartItemFormatter, cartListFormatter };
