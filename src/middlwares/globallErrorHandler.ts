import { ErrorRequestHandler } from "express";
import { handleJoiError } from "../app/errors/Joi.Error";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  let errorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // 👉 Joi Error Handle
  if (error.isJoi) {
    const simplifiedError = handleJoiError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error
  });
};