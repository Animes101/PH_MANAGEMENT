import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../queryBuilder/queryBuilder";
import { UserModel } from "../user/user.model";
import { TeacherModel } from "./facality.model"
import { ITeacher } from "./facality.interface";

const getAllFacality=async(query:Record<string, unknown>)=>{

    
      const queryBuilder = new QueryBuilder(
        TeacherModel.find(),
        query
      );

    const result = await queryBuilder
    .search(['name', 'email'])
    .filter()
    .sort()
    .pagination()
    .fields()
    .modelQuery;

  return result;

}

const getSingleFaculty = async (_id: string) => {

  const result = await TeacherModel.findById(_id);

  return result;
};

const deleteFacalityInotBod = async (_id: string) => {

  // 1️⃣ find student by custom id
  const teacher = await TeacherModel.findOne({ _id });

  if (!teacher) {
    throw new AppError("Facality not found", 404);
  }



  const session= await mongoose.startSession();

     try{

      session.startTransaction();
         // 2️⃣ get user _id from student
     const userId = teacher.user;

  // 3️⃣ soft delete both
  const result1 = await UserModel.findByIdAndUpdate(
    userId,
    { isDelete: true },
    { new: true , session}
  );

  if(!result1){
    throw new AppError('Failed to delete user', 400);
  }

  const result2 = await TeacherModel.findOneAndUpdate(
    { _id },
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
const updateFacalityIntoDb=async(_id:string, payload:ITeacher)=>{

  console.log(payload)


  const result = await TeacherModel.findByIdAndUpdate(_id, payload, {
      new: true
    });
  
    return result;



}






export const facalityServices={

    getAllFacality,
    getSingleFaculty,
    deleteFacalityInotBod,
    updateFacalityIntoDb
    
}