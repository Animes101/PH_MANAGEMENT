import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../acadamicSemister/acadamin.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateAdminId, generatedId, generateFacultyId } from "./user.utils";
import { ITeacher } from "../facality/facality.interface";
import { TeacherModel } from "../facality/facality.model";
import { academinDepertModel } from "../acdemonDepermant/academinDepertMent.model";
import { IAdmin } from "../admin/admin.interface";
import { adminModel } from "../admin/admin.model";




//create Student into DB
const createStudentIntoDB = async (studentData: IStudent) => {

  const academinSemester = await AcademicSemesterModel.findById(
    studentData.admisonSemester
  );

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
    needPassword:false,
    email:studentData.email,
    role: 'student',
  };

  const session = await mongoose.startSession();

  try {

    session.startTransaction();

    // create user
    const userNew = await UserModel.create([newUser], { session });

    if (!userNew.length) {
      throw new AppError("User creation failed", 400);
    }

    // set user data
    studentData.id = userNew[0].id as string;
    studentData.user = userNew[0]._id;

    const result = await StudentModel.create([studentData], { session });

    await session.commitTransaction();
    await session.endSession();

    return result;

  } catch (error) {

    await session.abortTransaction();
    await session.endSession();
    throw error;

  }
};



//createFacality into Db
const createFacalityintoDb = async (payload: ITeacher) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Check if academic semester exists
    const academicSemester = await academinDepertModel.findById(payload.department);
    if (!academicSemester) {
      throw new AppError('Academic semester not found', 404);
    }

    // 2. Check if email already exists
    const existingUser = await TeacherModel.findOne({ email: payload.email });
    if (existingUser) {
      throw new AppError("Email already exists", 400);
    }

        // 3️⃣ Generate Faculty ID
    const facultyId = await generateFacultyId(); 


    // 3. Create User
    const newUser: Partial<TUser> = {
      id: facultyId,
      password: config.DEFAULT_PASSWORD as string,
      needPassword:false,
    email:payload.email, // ideally hash this
      role: 'faculity',
    };

    const userNew = await UserModel.create([newUser], { session });

    // 4. Create Student linked to the user
    payload.id = userNew[0].id as string;
    payload.user = userNew[0]._id;

    const studentNew = await TeacherModel.create([payload], { session });

    // 5. Commit Transaction
    await session.commitTransaction();
    session.endSession();

    return studentNew[0]; // return the created student
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error; // re-throw for controller to handle
  }
};



export const createAdminIntoDB = async (payload: IAdmin) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1️⃣ Check if email already exists
    const existingUser = await adminModel.findOne({ email: payload.email });
    if (existingUser) {
      throw new AppError("Email already exists", 400);
    }

    // 2️⃣ Generate Admin ID
    const adminId = await generateAdminId();

    // 3️⃣ Create User
    const newUser: Partial<TUser> = {
      id: adminId,
      password: config.DEFAULT_PASSWORD as string, 
      needPassword:false,
    email:payload.email,// ideally hash this
      role: "admin",
    };

    const userNew = await UserModel.create([newUser], { session });

    if (!userNew.length) {
      throw new AppError("User creation failed", 500);
    }

    // 4️⃣ Create Admin Profile linked to user
    payload.id = userNew[0].id as string;
    payload.user = userNew[0]._id;

    const adminNew = await adminModel.create([payload], { session });

    // 5️⃣ Commit Transaction
    await session.commitTransaction();
    await session.endSession();

    return adminNew[0]; // return created admin
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};


const getMe = async (userId: string, userRole: string) => {
  let result = null;

  if (userRole === "student") {
    result = await StudentModel.findOne({ id: userId });
  }

  if (userRole === "faculty") {
    result = await TeacherModel.findOne({ id: userId });
  }

  if (userRole === "admin") {
    result = await adminModel.findOne({ id: userId });
  }

  return result;
};

export const UsersServices = {
  createStudentIntoDB,
  createFacalityintoDb,
  createAdminIntoDB,
  getMe

};