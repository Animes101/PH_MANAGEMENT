import AppError from "../../errors/AppError"
import QueryBuilder from "../../queryBuilder/queryBuilder"
import { AcademicSemesterModel } from "../acadamicSemister/acadamin.model"
import { Tregintation } from "./Registation.interFace"
import { registerModel } from "./Register.model"


const createRegisterIntoBd = async (payload: Partial<Tregintation>) => {

    //check if ther ay register sementer alredy upcoming or ongoing

    const isTherAnyUpcomingorOngoing = await registerModel.findOne({
        $or: [
            { status: 'UPCOMING' },
            { status: 'ONGOING' }
        ]
    });

    if (isTherAnyUpcomingorOngoing) {
        throw new AppError(
            `There is already ${isTherAnyUpcomingorOngoing.status} semester`,
            401
        );
    }


    const academinExits = await AcademicSemesterModel.findOne({ _id: payload.academinSemister })

    if (!academinExits) {

        throw new AppError('Academin Depertment not Fund', 401)

    }

    const isRegisterSementer = await registerModel.findOne({ academinSemister: payload?.academinSemister })

    if (isRegisterSementer) {

        throw new AppError('academin sementer all redy exits', 401)
    }



    const result = await registerModel.create(payload)

    return result

}
const updateRegisterintoDb = async (_id: string, payload: Partial<Tregintation>) => {


    //if the request sementer register is enddend 

    const requestRegister= await registerModel.findOne( {_id})

    if(requestRegister?.status === 'ENDED'){

        throw new AppError('this Register Sementer alredy Ended', 401)
    }


    const academinExits = await AcademicSemesterModel.findOne({ _id })

    if (!academinExits) {

        throw new AppError('Academin Depertment not Fund', 401)

    }




}


const deleteRegisterIntoDb = async (payload: Partial<Tregintation>) => {

    console.log(payload)
}


const findOneSingleRegister = async (_id: string) => {

    const result = await registerModel.findOne({ _id })

    return result;


}

const findAllSingleRegister = async (query: Record<string, unknown>) => {

    const queryBuilder = new QueryBuilder(
        registerModel.find(),
        query
    );


    const register = await queryBuilder
        .search(['academinSemister'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery

    return register;

}

export const RegisterServices = {

    createRegisterIntoBd,
    updateRegisterintoDb,
    deleteRegisterIntoDb,
    findOneSingleRegister,
    findAllSingleRegister
}