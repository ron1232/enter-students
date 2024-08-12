"use server";

import { ClassGrade } from "@/enums";
import { Assignment } from "@/types";
import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";
import { IAssignment } from "./Assignment";

export interface IStudent extends Document {
  name: string;
  classGrade: string;
  phoneNumber: string;
  assignments: Array<IAssignment>;
}

const studentSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
    index: true,
    validate: {
      validator: function (v: string) {
        return /^\d+$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid phone number!`,
    },
  },
  assignments: [{ type: ObjectId, ref: "Assignment", required: false }],
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

studentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);

export default Student;
