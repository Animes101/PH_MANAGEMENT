import { Types } from "mongoose"

export type TpreRequiesitesCorse={
    corse:Types.ObjectId;
    isDelete:boolean
}


export type TCorse={
    title:string,
    prefix:string,
    code:number,
    credits:number,
    preRequisiteCorse:[TpreRequiesitesCorse]
}

export type TassignFacalitis={

    corse:Types.ObjectId,
    faculties:[Types.ObjectId]
}