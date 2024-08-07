import { z } from "zod";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const LoginFormValidation = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  teacherId: z
    .string()
    .length(9, "ID is not valid")
    .regex(/^\d+$/, "ID must be numeric"),
});

export const EditOrAddStudentFormValidation = z.object({
  _id: z
    .string()
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    })
    .optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  classGrade: z.string().min(2).max(50),
  phoneNumber: z
    .string()
    .min(10, "Phone number must have 10 characters")
    .max(10, "Phone number must have 10 characters")
    .regex(/^\d+$/, "Phone number must be numeric"),
});
