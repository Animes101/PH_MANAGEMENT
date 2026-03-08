import { Types } from "mongoose";

export interface ITeacher {
  name: string;
  id: string;
  user: Types.ObjectId;

  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

  email: string;
  phoneNumber: string;
  address: string;

  designation: string; // Professor, Lecturer etc
  department: Types.ObjectId;

  isActive: "active" | "inactive";
  isDelete: boolean;
}