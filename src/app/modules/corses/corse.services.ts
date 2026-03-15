import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../queryBuilder/queryBuilder";
import { TassignFacalitis, TCorse } from "./corse.interface"
import { CorseFacultiesModel, CorseModel } from "./corse.model"

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { preRequisiteCorse, ...remainingData } = payload;

    // 1️⃣ update main course
    await CorseModel.findByIdAndUpdate(
      _id,
      remainingData,
      { new: true, session }
    );

    if (preRequisiteCorse && preRequisiteCorse.length > 0) {

      // 2️⃣ delete prerequisite
      const deletePreReq = preRequisiteCorse
        .filter((el) => el.isDelete)
        .map((el) => el.corse);

      if (deletePreReq.length > 0) {
        await CorseModel.findByIdAndUpdate(
          _id,
          {
            $pull: {
              preRequisiteCorse: { corse: { $in: deletePreReq } },
            },
          },
          { session }
        );
      }

      // 3️⃣ get updated course
      const course = await CorseModel
        .findById(_id)
        .session(session);

      const existingIds =
        course?.preRequisiteCorse?.map((item) =>
          item.corse.toString()
        ) || [];

      // 4️⃣ add new prerequisite
      const newPreRequestCourse = preRequisiteCorse.filter(
        (item) =>
          !item.isDelete &&
          !existingIds.includes(item.corse.toString())
      );

      if (newPreRequestCourse.length > 0) {
        await CorseModel.findByIdAndUpdate(
          _id,
          {
            $addToSet: {
              preRequisiteCorse: { $each: newPreRequestCourse },
            },
          },
          { new: true, session }
        );
      }
    }

    const result = await CorseModel
      .findById(_id)
      .session(session);

    await session.commitTransaction();
    session.endSession();

    return result;

  } catch (error) {

    await session.abortTransaction();
    session.endSession();

    throw  new AppError('Corse update Fail', 401);
  }
};

// assing facalitus

const assignFacalitsIntoDb = async (
  CorseId: string,
  payload: TassignFacalitis
) => {
  const result = await CorseFacultiesModel.findOneAndUpdate(
    { corse: CorseId },
    {
      $addToSet: {
        faculties: {
          $each: payload.faculties
        }
      }
    },
    { upsert: true, new: true }
  );

  return result;
};


export const corseServices={

    createCorseIntoDb,
    getAllCorsefromBd,
    getSingleCorseInotDb,
    deleteCorseFromDb,
    updateCorseFromDb,
    assignFacalitsIntoDb
    
}