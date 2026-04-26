const AppError = require("../../utils/appError");

const bodyValidator = (req, res, next) => {
  const body = req.body;
  if (body && typeof body === "string" && body.trim() !== "") return next();

  if (body && typeof body === "object" && Object.keys(body).length > 0)
    return next();

  next(new AppError("body is empty or invalid", 400));
};

module.exports = bodyValidator;
