import { NextFunction, Request, Response } from "express";
import AppError from "../app/errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../app/config";
import catchAsync from "../app/utility/catchAsync";
import { TuserRole } from "../app/modules/user/user.interface";

const auth = (...requiredRoles: TuserRole[]) => {


  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    // ❌ no token
    if (!authHeader) {
      throw new AppError("Forbidden access: No token provided", 403);
    }

    // ✅ Bearer token split
    const token = authHeader

    if (!token) {
      throw new AppError("Forbidden access: Invalid token format", 403);
    }

    // ✅ verify token
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_TOKEN as string
    ) as JwtPayload;

    // ✅ attach user
    req.user = decoded;

    console.log(decoded)

    // ✅ role check (IMPORTANT 🔥)
    if (requiredRoles.length && !requiredRoles.includes(decoded.userRole)) {
      throw new AppError("You are not authorized this role", 403);
    }

    next();
  });
};

export default auth;

