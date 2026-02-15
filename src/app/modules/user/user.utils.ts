import { IAcademicSemister } from "../acadamicSemister/seminter.interface";
import { UserModel } from "./user.model";




const findLastStudentId = async () => {
  const lastStudent = await UserModel
    .findOne({ role: 'student' }, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id;
};



export const generatedId = async (payload: IAcademicSemister) => {

  const { year, code } = payload;

  const lastStudentId = await findLastStudentId();

  let currentIdCount = 0; 

  if (lastStudentId) {
    const lastStudentYear = lastStudentId.substring(0, 4);
    const lastStudentCode = lastStudentId.substring(4, 6);

    if (
      lastStudentYear === year.toString() &&
      lastStudentCode === code
    ) {
      currentIdCount = Number(lastStudentId.substring(6));
    }
  }
  const incrementedId = (currentIdCount + 1)
    .toString()
    .padStart(4, '0');

  const generatedId = `${year}${code}${incrementedId}`;
  return generatedId;

};
