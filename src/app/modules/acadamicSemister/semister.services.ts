import { AcademicSemesterModel } from "./acadamin.model";
import { IAcademicSemister } from "./seminter.interface";



//create academic semester
const createAcademicSemester= async (payload:IAcademicSemister)=>{

    //semester name and code validation

type IAcademicSemesterNameCodeMap={
    [key:string]:string;

    }

    const academicSemesterNameCodeMap:IAcademicSemesterNameCodeMap={
    'Autumn':'01',
    'Summer':'02',
    'Fall':'03',
    }


    if(academicSemesterNameCodeMap[payload.name] !== payload.code){
         throw new Error('Invalid semester name and code combination');
    }


    const result= await AcademicSemesterModel.create(payload);
    return result;
}





//export academic semester services

export const createAcademicSemesterSercices={

    createAcademicSemester
}