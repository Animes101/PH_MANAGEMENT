import { AcademicSemesterModel } from "./acadamin.model";
import { IAcademicSemister } from "./seminter.interface";



//create academic semester
const createAcademicSemester= async (payload:IAcademicSemister)=>{


    const result= await AcademicSemesterModel.create(payload);
    return result;
}





//export academic semester services

export const createAcademicSemesterSercices={

    createAcademicSemester
}