import { StudentModel } from './student.model';

const getAllStudents = async () => {
  const result = await StudentModel.find().populate('admisonSemester').populate('user');
  return result;
};

const getSingleStudent= async (_id: string)=>{

    const result=await StudentModel.findOne({_id})

    return result
}

export const studentService = {


  getAllStudents,
  getSingleStudent,

};
