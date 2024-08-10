"use server";

import { ClassGrade } from "@/enums";
import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  name: string;
  classGrade: string;
  phoneNumber: string;
}

const studentSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  classGrade: {
    type: String,
    required: true,
    enum: ClassGrade,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^\d+$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid phone number!`,
    },
  },
  assignments: [{ type: ObjectId, ref: "Assignment", required: false }],
});

const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);

export default Student;
