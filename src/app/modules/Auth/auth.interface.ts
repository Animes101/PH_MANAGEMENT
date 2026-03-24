import { Model } from "mongoose";
import { TUser } from "../user/user.interface";


export interface IUser {
  id: string;
  password: string;
  isDelete?: boolean;
  role?: "admin" | "student" | "faculty";
  status?: "in-progress" | "blocked";
}

export interface authModel extends Model<TUser> {
  isUserExistsById(id: string): Promise<TUser | null>;
  isJWTIssuBeforePasswordChange(passwordChangeAt:Date, jwtIssuAt:number):boolean
}