import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { StudentModel } from './student.model';

const getAllStudents = async () => {
  const result = await StudentModel.find().populate('admisonSemester').populate('user');
  return result;
};

const getSingleStudent= async (_id: string)=>{

    const result=await StudentModel.findOne({_id})

    return result
}

const deleteStudent = async (id: string) => {

  // 1️⃣ find student by custom id
  const student = await StudentModel.findOne({ id });

  if (!student) {
    throw new AppError("Student not found", 404);
  }



  const session= await mongoose.startSession();

     try{

      session.startTransaction();
         // 2️⃣ get user _id from student
  const userId = student.user;

  // 3️⃣ soft delete both
  const result1 = await UserModel.findByIdAndUpdate(
    userId,
    { isDelete: true },
    { new: true , session}
  );

  if(!result1){
    throw new AppError('Failed to delete user', 400);
  }

  const result2 = await StudentModel.findOneAndUpdate(
    { id },
    { isDelete: true },
    { new: true, session }
  );


  if(!result2){
    throw new AppError('Failed to delete student', 400);
  }

  await session.commitTransaction();
  await session.endSession();

   return [result1, result2];

     }catch(error){
      await session.abortTransaction();
      await session.endSession();
        throw new AppError("Failed to delete student", 500);
     }

 
};

export const studentService = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
