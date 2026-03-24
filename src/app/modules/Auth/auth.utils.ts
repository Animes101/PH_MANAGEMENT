import * as jwt from "jsonwebtoken";

export const createToken = (
  payload: {
    userId: string;
    userRole: "admin" | "student" | "faculity" | undefined;
  },
  secretToken: string,
  expireTime: string // অথবা number
) => {
  // এখানে { expiresIn: expireTime } কে 'jwt.SignOptions' হিসেবে ডিফাইন করুন
  return jwt.sign(payload, secretToken, {
    expiresIn: expireTime,
  } as jwt.SignOptions); 
};