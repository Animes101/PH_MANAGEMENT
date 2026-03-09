import { IAcademicSemister } from "../acadamicSemister/seminter.interface";
import { ITeacher } from "../facality/facality.interface";
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
      currentIdCount = Number(lastStudentId.substring(6)) +1;
    }
  }
  const incrementedId = (currentIdCount + 1)
    .toString()
    .padStart(4, '0');

  const generatedId = `${year}${code}${incrementedId}`;
  return generatedId;

};



// 2. New Faculty ID generate koro
const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne({ role: 'faculity' }, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id; // Expected format: "F-0001"
};

export const generateFacultyId = async () => {
  const lastId = await findLastFacultyId();

  console.log(lastId)
  let currentIdCount = 0;

  if (lastId) {
    // Split "F-0001" to get "0001"
    currentIdCount = Number(lastId.split('-')[1]);
  }

  const incrementedId = (currentIdCount + 1).toString().padStart(4, '0');
  return `F-${incrementedId}`;
};


const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne({ role: 'admin' }, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id; // Expected format: "A-0001"
};

export const generateAdminId = async () => {
  const lastId = await findLastAdminId();

  let currentIdCount = 0;

  if (lastId) {
    // Split "A-0001" to get "0001"
    currentIdCount = Number(lastId.split('-')[1]);
  }

  const incrementedId = (currentIdCount + 1).toString().padStart(4, '0');
  return `A-${incrementedId}`;
};