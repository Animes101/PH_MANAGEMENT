
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../queryBuilder/queryBuilder";
import { adminModel } from "./admin.model"
import { UserModel } from "../user/user.model";
import { IAdmin } from "./admin.interface";


const getAllAdminfromBd = async (query: Record<string, unknown>) => {

  const queryBuilder = new QueryBuilder(
    adminModel.find(),
    query
  );
  

  const admins = await queryBuilder
    .search(['name', 'email'])
    .filter()
    .sort()
    .pagination()
    .fields()
    .modelQuery;

  return admins;
};


const deleteAdmin = async (_id: string) => {


  // 1️⃣ find admin by custom id
  const admin = await adminModel.findOne({ _id });


  if (!admin) {
    throw new AppError("Admin not found", 404);
  }

  const session = await mongoose.startSession();

  try {

    session.startTransaction();

    // 2️⃣ get user _id from admin
    const userId = admin.user;

    // 3️⃣ soft delete user
    const result1 = await UserModel.findByIdAndUpdate(
      userId,
      { isDelete: true },
      { new: true, session }
    );

    if (!result1) {
      throw new AppError("Failed to delete user", 400);
    }

    // 4️⃣ soft delete admin
    const result2 = await adminModel.findOneAndUpdate(
      { _id },
      { isDelete: true },
      { new: true, session }
    );

    if (!result2) {
      throw new AppError("Failed to delete admin", 400);
    }

    await session.commitTransaction();
    await session.endSession();

    return [result1, result2];

  } catch (error) {

    await session.abortTransaction();
    await session.endSession();

    throw new AppError("Failed to delete admin", 500);

  }

};

const getSingleAdminFromDb= async(_id:string)=>{

    const result= await adminModel.findOne({_id})



    return result;



}


const updateAdminfromDb = async (_id: string, payload:IAdmin) => {

  const result = await adminModel.findByIdAndUpdate(_id, payload, {
    new: true
  });

  return result;
};




export const adminServices={

    getAllAdminfromBd,
    getSingleAdminFromDb,
    deleteAdmin,
    updateAdminfromDb
}