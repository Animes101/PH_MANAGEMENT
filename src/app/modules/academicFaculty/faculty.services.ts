import QueryBuilder from "../../queryBuilder/queryBuilder";
import { IAcademicFaculty } from "./faculty.interface";
import { AcademicFacultyModel } from "./faculty.model";


const createAcademicFacultyDb = async (payload: IAcademicFaculty) => {
  // 🔥 আগে check করবে same name আছে কিনা
  const existingFaculty = await AcademicFacultyModel.findOne({
    name: payload.name,
  });

  if (existingFaculty) {
    throw new Error("Academic Faculty already exists");
  }

  // 🔥 না থাকলে create করবে
  const result = await AcademicFacultyModel.create(payload);

  return result;
};


const getAllAcademicFacultyDb= async(query:Record<string, unknown>)=>{
    
    const queryBuilder = new QueryBuilder(
    AcademicFacultyModel.find(),
    query
  );

  const academicFaculties = await queryBuilder
    .search(['name'])
    .filter()
    .sort()
    .pagination()
    .fields()
    .modelQuery

    const meta= await queryBuilder.coutTotal();


  return {meta, data:academicFaculties};

 
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