import { Types } from "mongoose";

export interface ITeacher {
  id:string;
  user:Types.ObjectId;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;

  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

  email: string;
  phoneNumber: string;
  address: string;

  designation: string;
  department: Types.ObjectId;

  isActive: "active" | "inactive";
  isDelete: boolean;
}