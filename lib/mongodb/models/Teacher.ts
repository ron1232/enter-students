"use server";

import mongoose, { Document, Schema } from "mongoose";

export interface ITeacher extends Document {
  username: string;
  teacherId: string;
}

const teacherSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  teacherId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^\d+$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid ID!`,
    },
  },
});

const Teacher =
  mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", teacherSchema);

export default Teacher;
