import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { nextTick } from "node:process";


//seting default value
export const errorHandler:ErrorRequestHandler = (
  error,
  req,
  res,
next 
) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  type TErrorSoures={

    path:string | number,
    message:string;
  }[]
  const errorSourese:TErrorSoures=[{

    path:'',
    message:'somthing Went Wrong'

  }]

  res.status(status).json({
    success: false,
    message,
    error,
    errorSourese
  });
};



