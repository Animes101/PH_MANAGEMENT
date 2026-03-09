
import QueryBuilder from "../../queryBuilder/queryBuilder";
import { adminModel } from "./admin.model"


const getAllAdminfromBd = async (query: Record<string, unknown>) => {

  const queryBuilder = new QueryBuilder(
    adminModel.find(),
    query
  );

  const admins = await queryBuilder
    .search(['name', 'email'])
    .filter()
    .sort()
    .pagination()
    .fields()
    .modelQuery;

  return admins;
};


const getSingleAdminFromDb= async(_id:string)=>{

    const result= await adminModel.findOne({_id})



    return result;



}

export const adminServices={

    getAllAdminfromBd,
    getSingleAdminFromDb
}