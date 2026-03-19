import { model, Schema } from "mongoose";
import { TofferCorse } from "./offerCorse.interface";

const offerCourseSchema = new Schema<TofferCorse>(
  {
    registationSementer: {
      type: Schema.Types.ObjectId,
      ref: "register",
      required: true,
    },
    academinSemester:{
      type: Schema.Types.ObjectId,
      ref: "register",
      required: true,

    },
    academinFacaulty: {
      type: Schema.Types.ObjectId,
      ref: "academicfaculties",
      required: true,
    },
    corse: {
      type: Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "teachers",
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    minCapacity: {
      type: Number,
      required: true,
    },
    days: {
      type: String,
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OfferCourseModel = model<TofferCorse>(
  "offercourse",
  offerCourseSchema
);