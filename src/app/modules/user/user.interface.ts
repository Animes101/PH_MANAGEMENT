import { User_Role } from "./user.constance";



export interface TUser {
  id: string;
  password: string;
  email:string;
  needPassword?: boolean;
  role?: "admin" | "student" | "faculity";
  status?: "in-progress" | "blocked";
  isDelete?: boolean;
  passwordChangeAt?:Date,
}

export type TuserRole=keyof typeof User_Role
