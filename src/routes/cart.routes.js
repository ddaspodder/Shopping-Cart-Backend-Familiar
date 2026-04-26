const express = require("express");
const routes = express.Router();
const bodyValidator = require("../middleware/validators/body.validator");

const {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController,
} = require("../controllers/cart.controller");

routes.get("/", getCartController);
routes.post("/add", bodyValidator, addToCartController);
routes.post("/remove", bodyValidator, removeFromCartController);
routes.post("/clear", bodyValidator, clearCartController);

module.exports = routes;
