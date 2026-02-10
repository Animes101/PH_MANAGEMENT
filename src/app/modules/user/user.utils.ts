import { IAcademicSemister } from "../acadamicSemister/seminter.interface";


export const generatedId = (payload: IAcademicSemister) => {

  const year = payload.year;
  const code = payload.code;

  const currentId = 0;

  const incrementedId = (currentId + 1)
    .toString()
    .padStart(6, '0');

  const generatedId = `${year}${code}${incrementedId}`;

  return generatedId;
};
