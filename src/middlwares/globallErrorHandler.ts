import { ErrorRequestHandler } from "express";
import { handleJoiError } from "../app/errors/Joi.Error";
import { TErrorSources } from "../app/interface/IError";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  let errorSources:TErrorSources[] = [
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


    res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error
  });

  }else if (error.name === "ValidationError") {
  statusCode = 400;
  message = "Validation Error";

  errorSources = Object.values(error.errors).map(
    (err: any): TErrorSources => ({
      path: err.path,
      message: err.message,
    })
  );

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
}
};