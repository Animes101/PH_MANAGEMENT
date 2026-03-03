import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { StudentModel } from './student.model';
import { IStudent } from './student.interface';



const getAllStudents = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };

  let searchTerm = '';

  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  // 🔍 Search
  let dbQuery = StudentModel.find({
    $or: ['name', 'email'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // 🧹 Filtering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObject[el]);

  dbQuery = dbQuery.find(queryObject);

  // 🔽 Sorting
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query.sort as string;
  }

  dbQuery = dbQuery.sort(sort);

  // 📄 Pagination
  let limit = 10;
  let page = 1;

  if (query?.limit) {
    limit = Number(query.limit);
  }

  if (query?.page) {
    page = Number(query.page);
  }

  const skip = (page - 1) * limit;

  dbQuery = dbQuery.skip(skip).limit(limit);

  // 🎯 Field Selection
  let fields = '-__v';

  if (query?.fields) {

    fields = (query.fields as string).split(',').join(' ');
  }
  
  
  dbQuery = dbQuery.select(fields);

  // 🔗 Populate
  const result = await dbQuery
    .populate('admisonSemester')
    .populate('user');

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

const updateStudentintoDb = async (id: string, payload: IStudent) => {

  const { guardian, ...remaining } = payload;

  const modifiedUpdateData: Record<string, unknown> = { ...remaining };

  // Nested guardian update
  if (guardian && Object.keys(guardian).length > 0) {

    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }

  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdateData,
    { new: true, runValidators: true }
  );

  return result;
};


export const studentService = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudentintoDb
};
