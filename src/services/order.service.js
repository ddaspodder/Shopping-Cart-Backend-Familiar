const { getProductById } = require("./product.service");
const { getCart, clearCart } = require("./cart.service");
const Order = require("../models/order.model");
const AppError = require("../utils/appError");

const getOrders = () => Order.find();

const getOrderById = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw new AppError("order doesnot exist", 404);
  return order;
};

const createOrder = async () => {
  const cart = await getCart();
  if (!cart || cart.length == 0) throw new AppError("cart is empty", 400);

  const orderItems = await Promise.all(
    cart.map(async (cartItem) => {
      const product = await getProductById(cartItem.productId);
      if (!product) throw new AppError("product doesn't exist", 404);
      return {
        productId: product.id,
        quantity: cartItem.quantity,
        price: product.price,
        itemTotal: product.price * cartItem.quantity,
      };
    }),
  );

  const currentDate = new Date().toISOString();

  const order = {
    items: orderItems,
    totalAmount: orderItems.reduce(
      (total, items) => total + items.itemTotal,
      0,
    ),
    status: "created",
    orderDate: currentDate,
    updatedAt: currentDate,
  };

  const createdOrder = await Order.create(order);

  await clearCart();

  return createdOrder;
};

const updateStatus = async (id, status) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );

  return updatedOrder;
};

module.exports = { getOrders, createOrder, getOrderById, updateStatus };
