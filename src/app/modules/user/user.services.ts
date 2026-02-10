
import config from "../../config";
import { AcademicSemesterModel } from "../acadamicSemister/acadamin.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generatedId } from "./user.utils";

const createStudentIntoDB = async (studentData: IStudent) => {


    const academinSemester =
  await AcademicSemesterModel.findById(studentData.admisonSemester);

if (!academinSemester) {
  throw new Error('Academic semester not found');
}


const newUser: Partial<TUser> = {
  id: await generatedId(academinSemester),
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
