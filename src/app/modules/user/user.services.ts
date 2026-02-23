
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../acadamicSemister/acadamin.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generatedId } from "./user.utils";

const createStudentIntoDB = async (studentData: IStudent) => {


    const academinSemester = await AcademicSemesterModel.findById(studentData.admisonSemester);

   if (!academinSemester) {
     throw new AppError('Academic semester not found', 404);
    }
        const existingUser = await StudentModel.findOne({ email: studentData.email });

          if (existingUser) {
            throw new AppError("Email already exists", 400);
          }


const newUser: Partial<TUser> = {
  id: await generatedId(academinSemester),
  password: config.DEFAULT_PASSWORD as string,
  role: 'student',
};

const session= await mongoose.startSession();

  try{


    session.startTransaction();
    
    //create a User

  const userNew = await UserModel.create([newUser], {session});
  // create a student

  if(userNew){

    //setUserId
    studentData.id=userNew[0].id as string;
    studentData.user=userNew[0]._id;

    const result =await StudentModel.create([studentData], {session});

    await session.commitTransaction();
    await session.endSession();

    return result


  }  }catch(error){
    await session.abortTransaction();
    await session.endSession();
    throw new AppError("Failed to create student", 500, (error as Error).stack);
  }
};

export const UsersServices = {
  createStudentIntoDB,
};
