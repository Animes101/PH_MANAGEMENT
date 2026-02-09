import { AcademicSemesterModel } from "./acadamin.model";
import { IAcademicSemesterNameCodeMap, IAcademicSemister } from "./seminter.interface";



//create academic semester
const createAcademicSemester= async (payload:IAcademicSemister)=>{

    //semester name and code validation

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


//find all academin semesters

const getAllAcademicSemesters= async()=>{

    const result= await AcademicSemesterModel.find();
    return result;
}

const getSingleAcademicSemester= async (_id:string)=>{

    const result= await AcademicSemesterModel.findById(_id);
    return result;
}




//export academic semester services

export const createAcademicSemesterSercices={

    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester
}