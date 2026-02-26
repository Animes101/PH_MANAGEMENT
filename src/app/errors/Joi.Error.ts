import { ValidationError } from "joi";

export const handleJoiError = (error: ValidationError) => {
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