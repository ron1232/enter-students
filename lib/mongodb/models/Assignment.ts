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
    index: true,
  },
  body: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

assignmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", assignmentSchema);

export default Assignment;
