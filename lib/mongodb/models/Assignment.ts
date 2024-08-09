"use server";

import mongoose, { Document, Schema } from "mongoose";

export interface IAssignment extends Document {
  title: string;
  body: string;
}

const assignmentSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", assignmentSchema);

export default Assignment;
