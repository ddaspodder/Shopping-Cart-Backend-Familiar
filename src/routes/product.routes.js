const {
  getAllProductsController,
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/product.controller");

const {
  createProductValidator,
  updateProductValidator,
} = require("../middleware/validators/product.validator");

const {
  paramsValidator,
} = require("../middleware/validators/params.validator");

const authGuard = require("../middleware/authentication.middleware");
const { adminGuard } = require("../middleware/authorization.middleware");

const bodyValidator = require("../middleware/validators/body.validator");

const express = require("express");

const router = express.Router();

router.get("/", getAllProductsController);

router.get("/:id", paramsValidator(["id"]), getProductController);

router.use(authGuard);
router.use(adminGuard);

router.post("/", bodyValidator, createProductValidator, addProductController);

router.patch(
  "/:id",
  paramsValidator(["id"]),
  bodyValidator,
  updateProductValidator,
  updateProductController,
);

router.delete("/:id", paramsValidator(["id"]), deleteProductController);

module.exports = router;
