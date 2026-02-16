import { IAcademicFaculty } from "./faculty.interface";
import { AcademicFacultyModel } from "./faculty.model";


const createAcademicFacultyDb=async(payload:IAcademicFaculty)=>{

    const result=await AcademicFacultyModel.create(payload);
    return result;
}


const getAllAcademicFacultyDb= async()=>{

    const result= await AcademicFacultyModel.find();

    return result;
}

const getSingleAcademicFacultyDb= async(id:string)=>{

    const result= await AcademicFacultyModel.findById(id);
    return result;
}

const updateAcademincFacultyDb= async(id:string, payload:Partial<IAcademicFaculty>)=>{

    const result= await AcademicFacultyModel.findByIdAndUpdate(id,payload,{new:true});
    return result;
}



export const academicFacultyServices={
    createAcademicFacultyDb,
    getAllAcademicFacultyDb,
    getSingleAcademicFacultyDb,
    updateAcademincFacultyDb


}