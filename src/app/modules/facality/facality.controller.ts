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


const getSingleFacality = catchAsync(async(req, res) => {

  const _id = req.params._id as string

  const result = await facalityServices.getSingleFaculty(_id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'aget all falaclty successfully',
    data: result,
  });
})


const deleteFacality = catchAsync(async(req, res) => {

  const _id = req.params._id as string

  const result = await facalityServices.deleteFacalityInotBod(_id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete Facality  successfully',
    data: result,
  });
})



const updateFacality=catchAsync(async(req, res)=>{

   const _id = req.params._id as string

  const result = await facalityServices.updateFacalityIntoDb(_id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update Facality successfully',
    data: result,
  });
})




export const  facalityController={

    getAllFacality,
    getSingleFacality,
    deleteFacality,
    updateFacality


}