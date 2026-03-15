import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/respons";
import { corseServices } from "./corse.services";


const createCorse=catchAsync(async(req,res)=>{

    const result=await corseServices.createCorseIntoDb(req.body)

    sendResponse(res,{
        statusCode: 201,
    success: true,
    message: 'create Corse Successfuly',
    data: result

    })
})

const getAllCorse=catchAsync(async(req,res)=>{


    const result=await corseServices.getAllCorsefromBd(req.query)

    sendResponse(res,{
        statusCode: 201,
    success: true,
    message: 'create Corse Successfuly',
    data: result

    })
})


const getSingleCorseFromDb=catchAsync(async(req,res)=>{

    const _id= req.params._id as string

    const result=await corseServices.getSingleCorseInotDb(_id)

    sendResponse(res,{
        statusCode: 201,
    success: true,
    message: 'create Corse Successfuly',
    data: result

    })
})


const deleteCorse=catchAsync(async(req,res)=>{

    const _id= req.params._id as string

    const result=await corseServices.deleteCorseFromDb(_id)

    sendResponse(res,{
        statusCode: 201,
    success: true,
    message: 'Delete  Corse Successfuly',
    data: result

    })
})


const updateCorse=catchAsync(async(req,res)=>{
    const _id= req.params._id as string

    const result=await corseServices.updateCorseFromDb(_id, req.body)

    sendResponse(res,{
        statusCode: 201,
    success: true,
    message: 'Update Corse  Successfuly',
    data: result

    })
})


const assignCorseFacalitis=catchAsync(async(req,res)=>{
    const CorseId= req.params.CorseId as string
    const  facalitis= req.body
    const result=await corseServices.assignFacalitsIntoDb(CorseId, facalitis)

    sendResponse(res,{
        statusCode: 201,
    success: true,
    message: 'Update Corse  Successfuly',
    data: result

    })
})


const deleteFacalitisCorse=catchAsync(async(req,res)=>{
    const CorseId= req.params.CorseId as string
    const  facalitis= req.body


    const result=await corseServices.deleteFaclitisCorseFromBd(CorseId, facalitis)

    sendResponse(res,{
    statusCode: 201,
    success: true,
    message: 'Remve  Corse Facakutus  Successfuly',
    data: result

    })
})





export const corseController={
    createCorse,
    getAllCorse,
    getSingleCorseFromDb,
    deleteCorse,
    updateCorse,
    assignCorseFacalitis,
    deleteFacalitisCorse

}