import config from "../../config";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentIntoDB = async (studentData: IStudent) => {

const newUser: Partial<TUser> = {
  id: new Date().toISOString(), // eita string hobe
  password: config.DEFAULT_PASSWORD as string,
  role: 'student',
};
  //create a User

  const userNew = await UserModel.create(newUser);


  // create a student

  if(userNew){

    //setUserId

    studentData.id=userNew.id;
    studentData.user=userNew._id;

    const result =await StudentModel.create(studentData);

    return result


  }




};

export const UsersServices = {
  createStudentIntoDB,
};
