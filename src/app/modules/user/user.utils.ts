import { IAcademicSemister } from "../acadamicSemister/seminter.interface";
import { UserModel } from "./user.model";


const findLastStudentId= async()=>{

  const lastStudent= await UserModel.findOne({role:'student'},{id:1}).sort({createdAt:-1}).lean();

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;

}



// export const generatedId = async (payload: IAcademicSemister) => {

//   const year = payload.year;
//   const code = payload.code;
//   const currentId = await findLastStudentId() || (0).toString();

//   const incrementedId = (currentId + 1)
//     .toString()
//     .padStart(6, '0');

//   const generatedId = `${year}${code}${incrementedId}`;

//   return generatedId;
// };

export const generatedId = async (payload: IAcademicSemister) => {
  const year = payload.year;
  const code = payload.code;
  const lastStudentId = await findLastStudentId(); 
  
  const currentIdCount = lastStudentId ? parseInt(lastStudentId) : 0;

  const incrementedId = (currentIdCount + 1).toString().padStart(4, '0'); 

  const generatedId = `${year}${code}${incrementedId}`;

  return generatedId;
};