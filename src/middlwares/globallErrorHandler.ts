import { Request, Response, NextFunction } from "express";


// Express global error middleware
 export const errorHandler = (
  error: any, // TypeScript এর জন্য any, বা better হলে custom Error type use করতে পারো
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  res.status(status).json({
    success: false,
    message,
    error:error,
    
  });
};

