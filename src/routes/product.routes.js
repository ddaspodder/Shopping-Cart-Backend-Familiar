const {
  getAllProductsController,
  getProductController,
  addProductController,
  updateProductController,
} = require("../controllers/product.controller");

const {
  createProductValidator,
  updateProductValidator,
} = require("../middleware/validators/product.validator");

const {
  paramsValidator,
} = require("../middleware/validators/params.validator");

const bodyValidator = require("../middleware/validators/body.validator");

const express = require("express");

const router = express.Router();

router.get("/", getAllProductsController);

router.get("/:id", paramsValidator(["id"]), getProductController);

//have to implment admin auth guard to protect these routes

router.post("/", bodyValidator, createProductValidator, addProductController);

router.patch(
  "/:id",
  paramsValidator(["id"]),
  bodyValidator,
  updateProductValidator,
  updateProductController,
);

module.exports = router;
