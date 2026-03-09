// import { ErrorRequestHandler } from "express";
// import { handleJoiError } from "../app/errors/Joi.Error";
// import { TErrorSources } from "../app/interface/IError";
// import AppError from "../app/errors/AppError";
// import { handleCastError } from "../app/errors/handleCastError";

// export const errorHandler: ErrorRequestHandler = (
//   error,
//   req,
//   res,
//   next
// ) => {

//   let statusCode = error.statusCode || 500;
//   let message = error.message || "Something went wrong";



//   let errorSources:TErrorSources[] = [
//     {
//       path: "",
//       message: "Something went wrong",
//     },
//   ];

//   // 👉 Joi Error Handle
//   if (error.isJoi) {
//     const simplifiedError = handleJoiError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorSources = simplifiedError.errorSources;


//     res.status(statusCode).json({
//     success: false,
//     message,
//     errorSources,
//   });

//   }else if (error.name === "ValidationError") {
//   statusCode = 400;
//   message = "Validation Error";

//   errorSources = Object.values(error.errors).map(
//     (err: any): TErrorSources => ({
//       path: err.path,
//       message: err.message,
//     })
//   );

//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorSources,
//   });
// }else if (error.name === "CastError") {
//   const simplifiedError = handleCastError(error);
//   statusCode = simplifiedError.statusCode;
//   message = simplifiedError.message;
//   errorSources = simplifiedError.errorSources;
// }else if (error instanceof AppError) {
//   statusCode = error?.statusCode;
//   message = error?.message;

//   errorSources = [{
//     path:'',
//     message:error?.message,
//   }]
//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorSources,
//   });
// }else if (error instanceof Error) {
//   statusCode =  500;
//   message = "Somthin Went Wrong";

//   errorSources = [{
//     path:'',
//     message:error?.message,
//   }]
//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorSources,
//     error
//   });
// }


// // ✅ ONLY ONE RESPONSE SEND HERE
//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorSources,
//   });


// };



import { ErrorRequestHandler } from "express";
import { handleJoiError } from "../app/errors/Joi.Error";
import { TErrorSources } from "../app/interface/IError";
import AppError from "../app/errors/AppError";
import { handleCastError } from "../app/errors/handleCastError";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // ১. ডিফল্ট ভ্যালু সেট করা
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";
  let errorSources: TErrorSources[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // ২. কন্ডিশন অনুযায়ী শুধু ভেরিয়েবলগুলো আপডেট করা (res.json কল করবেন না এখানে)
  if (error.isJoi) {
    const simplifiedError = handleJoiError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } 
  else if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errorSources = Object.values(error.errors).map(
      (err: any): TErrorSources => ({
        path: err.path,
        message: err.message,
      })
    );
  } 
  else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } 
  else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  } 
  else if (error instanceof Error) {
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  // ৩. ফাইনাল রেসপন্স (পুরো ফাংশনে মাত্র একবারই এই লাইনটি থাকবে)
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // stack: process.env.NODE_ENV === 'development' ? error.stack : null, // ডিবাগিংয়ের জন্য চাইলে রাখতে পারেন
  });
};