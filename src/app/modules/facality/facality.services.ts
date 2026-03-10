import QueryBuilder from "../../queryBuilder/queryBuilder";
import { TeacherModel } from "./facality.model"

const getAllFacality=async(query:Record<string, unknown>)=>{

    
      const queryBuilder = new QueryBuilder(
        TeacherModel.find(),
        query
      );

    const result = await queryBuilder
    .search(['name', 'email'])
    .filter()
    .sort()
    .pagination()
    .fields()
    .modelQuery;

  return result;
  
}

const getSingleFacality=async(_id)=>{


    const result=await TeacherModel.findOne({_id})

    return result
}





export const facalityServices={

    getAllFacality,
    getSingleFacality
    
}