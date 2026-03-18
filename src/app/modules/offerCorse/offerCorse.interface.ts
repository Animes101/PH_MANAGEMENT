import { Types } from "mongoose";

export type TDays = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday';

export type TofferCorse = {
  registationSementer: Types.ObjectId;
  academinSementer: Types.ObjectId;
  academinFacaulty: Types.ObjectId;
  corse: Types.ObjectId;
  teacher: Types.ObjectId;
  maxCapacity: number;
  minCapacity: number;
  days: TDays;
  startTime: string;
  endTime: string;
};