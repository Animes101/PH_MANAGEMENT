import QueryBuilder from "../../queryBuilder/queryBuilder";
import { TCorse } from "./corse.interface"
import { CorseModel } from "./corse.model"

const createCorseIntoDb=async(payload:TCorse)=>{


    const result= await CorseModel.create(payload);
    return result


}

const getAllCorsefromBd=async(query:Record<string,unknown>)=>{
    const queryBuilder = new QueryBuilder(
        CorseModel.find(),
        query
      );
    
      const corses = await queryBuilder
        .search(['title'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery
      return corses;

}

const getSingleCorseInotDb= async(_id:string)=>{

    const result=await CorseModel.findOne({_id})

    return result
}



export const corseServices={

    createCorseIntoDb,
    getAllCorsefromBd,
    getSingleCorseInotDb
    
}