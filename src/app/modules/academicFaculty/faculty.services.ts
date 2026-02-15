import { IAcademicFaculty } from "./faculty.interface";
import { AcademicFacultyModel } from "./faculty.model";


const createAcademicFacultyDb=async(payload:IAcademicFaculty)=>{

    const result=await AcademicFacultyModel.create(payload);
    return result;
}




export const academicFacultyServices={
    createAcademicFacultyDb,
}