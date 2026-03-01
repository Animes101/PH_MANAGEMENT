import { ValidationError } from "joi";
import { IErrorResponse } from "../interface/IError";

export const handleJoiError = (error: ValidationError):IErrorResponse => {
  const errorSources = error.details.map((err) => ({
    path: err.path.join("."), // ✅ always string
    message: err.message.replace(/"/g, ""),
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
    
  };
};