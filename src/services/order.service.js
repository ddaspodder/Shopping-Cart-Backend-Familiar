const { getProductById } = require("./product.service");
const { getCart, clearCart } = require("./cart.service");
const Order = require("../models/order.model");
const AppError = require("../utils/appError");

const getOrders = (userId) => Order.find({ userId });

const getOrderById = async (userId, id) => {
  const order = await Order.findOne({ _id: id, userId });
  if (!order) throw new AppError("order doesnot exist", 404);
  return order;
};

const createOrder = async (userId) => {
  const cart = await getCart(userId);
  if (!cart || cart.length == 0) throw new AppError("cart is empty", 400);

  const orderItems = await Promise.all(
    cart.map(async (cartItem) => {
      const product = await getProductById(cartItem.productId);
      if (!product) throw new AppError("product doesn't exist", 404);

      return {
        productId: product.id, //mongoose allows product.id
        quantity: cartItem.quantity,
        price: product.price,
        itemTotal: product.price * cartItem.quantity,
      };
    }),
  );

  const order = {
    userId,
    items: orderItems,
    totalAmount: orderItems.reduce(
      (total, items) => total + items.itemTotal,
      0,
    ),
    status: "created",
  };

  const createdOrder = await Order.create(order);

  await clearCart(userId);

  return createdOrder;
};

const updateStatus = async (userId, id, status) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: id, userId },
    { status },
    { returnDocument: "after" },
  );

  if (!updatedOrder) throw new AppError("order doesnot exist", 404);

  return updatedOrder;
};

module.exports = { getOrders, createOrder, getOrderById, updateStatus };
