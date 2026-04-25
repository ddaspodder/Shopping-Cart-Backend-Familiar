const asyncHandler = require("../lib/asyncHandler");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
} = require("../service/product.service");

const AppError = require("../lib/appError");

const { success } = require("../lib/responseHandler");

const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await getAllProducts();
  success(res, products);
});

const getProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) throw new AppError("bad id", 400);
  const product = await getProductById(id);
  success(res, product);
});

const addProductController = asyncHandler(async (req, res) => {
  const product = await addProduct(req.body);
  success(res, product, 201);
});

const updateProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await updateProduct(id, req.body);
  success(res, product);
});

module.exports = {
  getAllProductsController,
  getProductController,
  addProductController,
  updateProductController,
};
