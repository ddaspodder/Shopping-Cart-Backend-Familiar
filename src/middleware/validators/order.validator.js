const AppError = require("../../utils/appError");

const STATUS = {
  CREATED: "created",
  PENDING: "pending",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};

const updateStatusValidator = (req, res, next) => {
  const { status } = req.body;
  const validStatus = Object.values(STATUS);
  if (!status || !validStatus.includes(status))
    return next(new AppError("invalid status", 400));
  next();
};

module.exports = {
  updateStatusValidator,
};
