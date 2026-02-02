import { object } from "joi";
import config from "../../config";
import { IStudent } from "../student/student.interface";
import { newUser, TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentIntoDB = async (studentData: IStudent) => {

  const newUser: newUser = {
    id:'2330450',
    password: config.DEFAULT_PASSWORD as string,
    role: 'student',


  };

  //create a User

  const result = await UserModel.create(newUser);
  return result;

  // create a student

  if(result){

    //setUserId

    studentData.id=result.id;

    
  }




};

export const UsersServices = {
  createStudentIntoDB,
};
