import catchAsync from "../../utility/catchAsync"
import sendResponse from "../../utility/respons";
import { facalityServices } from "./facality.services"



const getAllFacality=catchAsync(async(req, res)=>{

    const result=facalityServices.getAllFacality(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'aget all falaclty successfully',
        data: result,
      });
})


const getSingleFacality=catchAsync(async(req, res)=>{

    const _id=req.params._id as string

    const result= await facalityServices.getSingleFacality({_id})

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'aget all falaclty successfully',
        data: result,
      });
})

export const  facalityController={

    getAllFacality,
    getSingleFacality
}