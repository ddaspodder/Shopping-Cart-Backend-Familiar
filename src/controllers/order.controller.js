const {
  getOrders,
  createOrder,
  getOrderById,
  updateStatus,
} = require("../services/order.service");
const asyncHandler = require("../utils/asyncHandler");

const AppError = require("../utils/appError");

const { success } = require("../utils/responseHandler");

const createOrderController = asyncHandler(async (req, res) => {
  const order = await createOrder();
  success(res, order, 201);
});

const getOrderController = asyncHandler(async (req, res) => {
  const orders = await getOrders();
  success(res, orders);
});

const getOrderByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) throw new AppError("bad id", 400);
  const order = await getOrderById(id);
  success(res, order);
});

const updateStatusController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  if (!id) throw new AppError("bad id", 400);
  if (!status) throw new AppError("status is required", 400);
  const order = await updateStatus(id, status);
  success(res, order);
});

module.exports = {
  createOrderController,
  getOrderController,
  getOrderByIdController,
  updateStatusController,
};
