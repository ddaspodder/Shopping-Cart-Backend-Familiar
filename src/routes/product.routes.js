const {
  getAllProductsController,
  getProductController,
  addProductController,
  updateProductController,
} = require("../controller/product.controller");

const {
  createProductValidator,
  updateProductValidator,
} = require("../middleware/validators/product.validator");

const {
  paramsValidator,
} = require("../middleware/validators/params.validator");

const express = require("express");

const router = express.Router();

router.get("/", getAllProductsController);

router.get("/:id", paramsValidator(["id"]), getProductController);

router.post("/", createProductValidator, addProductController);

router.put(
  "/:id",
  paramsValidator(["id"]),
  updateProductValidator,
  updateProductController,
);

module.exports = router;
