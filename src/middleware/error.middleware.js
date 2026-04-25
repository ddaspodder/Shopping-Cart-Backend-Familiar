const AppError = require("../lib/appError");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "something went wrong" });
};

module.exports = errorMiddleware;
