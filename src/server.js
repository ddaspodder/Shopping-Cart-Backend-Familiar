const express = require("express");

require("dotenv").config();

const http = require("http");

const app = express();

const connectDB = require("./config/db");
connectDB();

const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");

const errorMiddleware = require("./middleware/error.middleware");
const AppError = require("./utils/appError");

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Express and MongoDB Shopping API");
});

app.use((req, res, next) => {
  next(new AppError("invalid route", 404));
});

app.use(errorMiddleware);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
