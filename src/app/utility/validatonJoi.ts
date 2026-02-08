import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

const validationRequest = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {


    console.log(req.body )

    
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return next(error);
    }

    req.body = value;
    
    next();
  };
};

export default validationRequest;