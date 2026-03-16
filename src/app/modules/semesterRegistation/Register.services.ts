import { Tregintation } from "./Registation.interFace"
import { registerModel } from "./Register.model"


const  createRegisterIntoBd=async(payload:Partial<Tregintation>)=>{

    console.log(payload)
}
const  updateRegisterintoDb=async(payload:Partial<Tregintation>)=>{

    console.log(payload)
}


const  deleteRegisterIntoDb=async(payload:Partial<Tregintation>)=>{

    console.log(payload)
}


const  findOneSingleRegister=async(_id:string)=>{

    const result=await registerModel.findOne({_id})

    return result;

   
}

const  findAllSingleRegister=async()=>{

    const result= await registerModel.find();

    return result;


    
}



export const RegisterServices={

    createRegisterIntoBd,
    updateRegisterintoDb,
    deleteRegisterIntoDb,
    findOneSingleRegister,
    findAllSingleRegister
}