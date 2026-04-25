const AppError = require("../lib/appError");
const { getData, save } = require("../lib/readWriteHandler");

const PRODUCT_PATH = "src/lib/product.json";

const getAllProducts = async () => {
  const products = await getData(PRODUCT_PATH);
  return products;
};

const getProductById = async (id) => {
  const products = await getData(PRODUCT_PATH);
  const product = products.find((product) => product.id === id);
  if (!product) throw new AppError("product not found", 404);
  return product;
};

const addProduct = async (data) => {
  const { name, price } = data;

  const newProduct = {
    id: Date.now().toString(),
    name,
    price,
  };

  const products = await getAllProducts();
  products.push(newProduct);
  await save(PRODUCT_PATH, products);

  return newProduct;
};

const updateProduct = async (id, data) => {
  const { name, price } = data;

  const products = await getAllProducts();
  const product = products.find((product) => product.id === id);

  if (!product) throw new AppError("product not found", 404);

  product.name = name;
  product.price = price;
  await save(PRODUCT_PATH, products);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
};
