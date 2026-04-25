const express = require("express");
const routes = express.Router();

const {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController,
} = require("../controller/cart.controller");

routes.get("/", getCartController);
routes.post("/add", addToCartController);
routes.post("/remove", removeFromCartController);
routes.post("/clear", clearCartController);

module.exports = routes;
