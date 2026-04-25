const {
  getOrderController,
  createOrderController,
  getOrderByIdController,
  updateStatusController,
} = require("../controller/order.controller");

const {
  updateStatusValidator,
} = require("../middleware/validators/order.validator");

const express = require("express");
const {
  paramsValidator,
} = require("../middleware/validators/params.validator");
const routes = express.Router();

routes.post("/", createOrderController);
routes.get("/", getOrderController);
routes.get("/:id", paramsValidator(["id"]), getOrderByIdController);
routes.patch(
  "/:id/status",
  paramsValidator(["id"]),
  updateStatusValidator,
  updateStatusController,
);

module.exports = routes;
