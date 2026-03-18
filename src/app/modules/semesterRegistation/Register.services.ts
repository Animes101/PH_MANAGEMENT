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
const updateRegisterintoDb = async (
  _id: string,
  payload: Partial<Tregintation>
) => {

  // 1️⃣ find register
  const requestRegister = await registerModel.findById(_id);

  if (!requestRegister) {
    throw new AppError('Register not found', 404);
  }

  // 2️⃣ check if already ended
  if (requestRegister.status === 'ENDED') {
    throw new AppError('This Register Semester already ended', 400);
  }

  // 3️⃣ check academic semester using reference id
  const academinExits = await AcademicSemesterModel.findById(
    requestRegister.academinSemister
  );

  if (!academinExits) {
    throw new AppError('Academic Semester not found', 404);
  }

  //UPCOMING => ONGOING => ENDED

  if(requestRegister.status === 'UPCOMING' && payload?.status == 'ENDED'){

    throw new AppError('You Can not Update this status Ended', 402)


  }

  
  if(requestRegister.status === 'ONGOING' && payload?.status == 'UPCOMING'){

    throw new AppError('You Can not Update this status UPCOMING', 402)


  }


  // 4️⃣ update
  const result = await registerModel.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  return result;

};


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