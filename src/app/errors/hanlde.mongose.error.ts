

export const handlemongoseValidationError = (error:) => {
  const errorSources = ;

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};