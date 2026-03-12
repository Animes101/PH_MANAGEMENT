import AppError from "../../errors/AppError";
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

const deleteCorseFromDb= async(_id:string)=>{

    // 1️⃣ find student by custom id
      const corse = await CorseModel.findOne({ _id });
    
      if (!corse) {
        throw new AppError("Corse  not found", 404);
      }   

    const result=await CorseModel.findOneAndUpdate({_id}, {isDelete:true}, {new:true} )

    return result
}

const updateCorseFromDb = async (_id: string, payload: TCorse) => {

  const { preRequisiteCorse, ...remainingData } = payload;

  // 1️⃣ update basic data
  const updatedCourse = await CorseModel.findByIdAndUpdate(
    _id,
    remainingData,
    { new: true }
  );

  // 2️⃣ delete prerequisite course
  if (preRequisiteCorse && preRequisiteCorse.length > 0) {

    const deletePreReq = preRequisiteCorse
      .filter((el) => el.isDelete === true)
      .map((el) => el.corse);

    if (deletePreReq.length > 0) {
      await CorseModel.findByIdAndUpdate(_id, {
        $pull: {
          preRequisiteCorse: { corse: { $in: deletePreReq } },
        },
      });
    }
  }

  return updatedCourse;
};



export const corseServices={

    createCorseIntoDb,
    getAllCorsefromBd,
    getSingleCorseInotDb,
    deleteCorseFromDb,
    updateCorseFromDb
    
}