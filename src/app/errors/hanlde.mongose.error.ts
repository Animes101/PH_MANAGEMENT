import { IErrorResponse, TErrorSources } from "../interface/IError";

export const handleMongooseValidationError = (error: any):IErrorResponse => {
  const errorSources: TErrorSources[] = Object.values(error.errors).map(
    (err: any) => ({
      path: err.path,
      message: err.message,
    })
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};