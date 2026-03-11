import { TCorse } from "./corse.interface"

const createCorseIntoDb=(payload:TCorse)=>{

    console.log(payload)
}


export const corseServices={

    createCorseIntoDb
}