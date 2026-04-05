import { UserModel } from "../modules/user/user.model"

 const SuperAdmin={
        id:"Super-01",
        password:"superadmin",
        email:"superadmin@example.com",
        role:"superAdmin",
        status:"in-progress",
        isDelete:false,
    }


const seedSuperAdmin= async()=>{


    const isExist=await UserModel.findOne({role:"superAdmin"})

    if(!isExist){

        await UserModel.create(SuperAdmin)
    }

   


}


export default seedSuperAdmin;