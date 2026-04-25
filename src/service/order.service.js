const { getData, save } = require("../lib/readWriteHandler");
const { getAllProducts } = require("./product.service");
const { getCart, clearCart } = require("./cart.service");
const AppError = require("../lib/appError");

const ORDER_PATH = "src/lib/order.json";

const getOrders = () => getData(ORDER_PATH);

const getOrderById = async (id) => {
  const orders = await getOrders();
  const order = orders.find((order) => order.orderId === id);
  if (!order) throw new AppError("order doesnot exist", 404);
  return order;
};

const createOrder = async () => {
  const cart = await getCart();
  if (!cart || cart.length == 0) throw new AppError("cart is empty", 400);

  const products = await getAllProducts();

  const productsIndex = products.reduce((o, product) => {
    o[product.id] = product;
    return o;
  }, {});

  const orderItems = cart.map((cartItem) => {
    const product = productsIndex[cartItem.productId];
    if (!product) throw new AppError("product doesn't exist", 404);
    return {
      productId: product.id,
      quantity: cartItem.quantity,
      price: product.price,
      itemTotal: product.price * cartItem.quantity,
    };
  });

  const currentDate = new Date().toISOString();

  const order = {
    orderId: Date.now().toString(),
    items: orderItems,
    totalAmount: orderItems.reduce(
      (total, items) => total + items.itemTotal,
      0,
    ),
    status: "created",
    orderDate: currentDate,
    updatedAt: currentDate,
  };

  const orders = await getOrders();
  orders.push(order);
  await save(ORDER_PATH, orders);

  await clearCart();

  return { orderId: order.orderId };
};

const updateStatus = async (id, status) => {
  const order = await getOrderById(id);
  order.status = status;
  order.updatedAt = new Date().toISOString();

  const orders = await getOrders();
  const updatedOrders = orders.map((o) => {
    if (o.orderId === id) {
      return order;
    }
    return o;
  });

  await save(ORDER_PATH, updatedOrders);

  return order;
};

module.exports = { getOrders, createOrder, getOrderById, updateStatus };
