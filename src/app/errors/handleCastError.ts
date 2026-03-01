import { TErrorSources } from "../interface/IError";

export const handleCastError = (error: any) => {
  const errorSources: TErrorSources[] = [
    {
      path: error.path,
      message: `Invalid ${error.path}: ${error.value}`,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectId",
    errorSources,
  };
};