const AppError = require("../utils/appError");
const Product = require("../models/product.model");

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError("product not found", 404);
  return product;
};

const addProduct = async (data) => {
  const { name, price } = data;
  const newProduct = await Product.create({ name, price });
  return newProduct;
};

const updateProduct = async (id, data) => {
  const { name, price } = data;

  const updatedData = {};

  if (name) updatedData.name = name;
  if (price) updatedData.price = price;

  const product = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!product) throw new AppError("product doesn't exist", 404);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
};
