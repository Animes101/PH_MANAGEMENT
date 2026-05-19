import AppError from "../../errors/AppError"
import QueryBuilder from "../../queryBuilder/queryBuilder"
import { AcademicSemesterModel } from "../acadamicSemister/acadamin.model"
import { Tregintation } from "./Registation.interFace"
import { registerModel } from "./Register.model"


const createRegisterIntoBd = async (payload: Partial<Tregintation>) => {
  // 1️⃣ check academic semester exists
  const academinExits = await AcademicSemesterModel.findOne({
    _id: payload.academinSemister,
  });

  if (!academinExits) {
    throw new AppError("Academic Semester not found", 404);
  }

  // 2️⃣ check same semester already exists
  const isRegisterSementer = await registerModel.findOne({
    academinSemister: payload.academinSemister,
  });

  if (isRegisterSementer) {
    throw new AppError(
      "This academic semester already registered",
      400
    );
  }

  // 3️⃣ check ONLY ONE ACTIVE (UPCOMING/ONGOING)
  const isActiveExists = await registerModel.findOne({
    status: { $in: ["UPCOMING", "ONGOING"] },
  });

  if (isActiveExists) {
    throw new AppError(
      `Already ${isActiveExists.status} semester exists`,
      400
    );
  }

  // 4️⃣ create
  const result = await registerModel.create(payload);

  return result;
};


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