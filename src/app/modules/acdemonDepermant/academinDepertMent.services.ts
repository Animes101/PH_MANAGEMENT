import QueryBuilder from "../../queryBuilder/queryBuilder";
import { AcademinDepartmentInterface } from "./academinDepert.interface"
import { academinDepertModel } from "./academinDepertMent.model"



const createAcademinDepartmentDb=(payload:AcademinDepartmentInterface)=>{

    const result=academinDepertModel.create(payload);
    return result;

}


const  getAllAcademinDepartmentDb= async (query: Record<string, unknown>)=>{

   const queryBuilder = new QueryBuilder(
       academinDepertModel.find(),
       query
     );
   
     const academinDepartments = await queryBuilder
       .search(['name'])
       .filter()
       .sort()
       .pagination()
       .fields()
       .modelQuery
   
       const meta= await queryBuilder.coutTotal();
   
     return {meta, data:academinDepartments};
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