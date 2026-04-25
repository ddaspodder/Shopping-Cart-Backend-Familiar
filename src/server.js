const express = require("express");

const http = require("http");

const app = express();

const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

const errorMiddleware = require("./middleware/error.middleware");

app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Express and Postgre SQL");
});

app.use(errorMiddleware);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
