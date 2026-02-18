import { AcademinDepartmentInterface } from "./academinDepert.interface"
import { academinDepertModel } from "./academinDepertMent.model"



const createAcademinDepartmentDb=(payload:AcademinDepartmentInterface)=>{

    const result=academinDepertModel.create(payload);
    return result;

}


const  getAllAcademinDepartmentDb=()=>{

    const retult= academinDepertModel.find();
    return retult;
}

const getSingleAcademinDepartmentDb=(id:string)=>{

    const result=academinDepertModel.findById(id);
    return result;
}


const updateAcademinDepartmentDb=(id:string, payload:AcademinDepartmentInterface)=>{

    const result=academinDepertModel.findByIdAndUpdate(id,payload,{new:true});
    return result;
}
export const academinServices={
    createAcademinDepartmentDb,
    getAllAcademinDepartmentDb,
    getSingleAcademinDepartmentDb,
    updateAcademinDepartmentDb
}