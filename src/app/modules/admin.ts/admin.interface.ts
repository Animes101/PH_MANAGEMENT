import { Types } from "mongoose";

export interface IAdmin {
  id: string;
  user: Types.ObjectId;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;
  bloodGroup: 
    | "A+" 
    | "A-" 
    | "B+" 
    | "B-" 
    | "AB+" 
    | "AB-" 
    | "O+" 
    | "O-";

  email: string;
  phoneNumber: string;
  address: string;

  role: "SUPER_ADMIN" | "ADMIN";

  isActive: "active" | "inactive";
  isDelete: boolean;
}