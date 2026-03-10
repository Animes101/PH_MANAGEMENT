import catchAsync from "../../utility/catchAsync"
import { adminServices } from "./admin.services"


const  getAllAdmin=catchAsync(async(req, res)=>{

    const result=await adminServices.getAllAdminfromBd(req.query)


    res.status(200).json({
    success: true,
    message: 'All students Get  successfully',
    data: result,
  });
})


const getSingleAdmin=catchAsync(async(req , res)=>{

    const id=req.params._id as string

    const  result= await adminServices.getSingleAdminFromDb(id)

    res.status(200).json({
    success: true,
    message: 'Single admin Get  successfully',
    data: result,
  });


})

const deleteAdmin=catchAsync(async(req , res)=>{

    const _id=req.params._id as string

    const  result= await adminServices.deleteAdmin(_id)

    res.status(200).json({
    success: true,
    message: 'Single admin Get  successfully',
    data: result,
  });


})

const upadeAdmin=catchAsync(async(req , res)=>{

    const _id=req.params._id as string

    const result= await adminServices.updateAdminfromDb(_id, req.body);

    res.status(200).json({
    success: true,
    message: 'Single admin Get  successfully',
    data: result,
  });


})

export const adminController={

  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  upadeAdmin
}