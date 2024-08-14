import { z } from "zod";

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

export const EditOrAddAssignmentFormValidation = z.object({
  _id: z.string().optional(),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  body: z
    .string()
    .min(2, "Body must be at least 2 characters")
    .max(100, "Body must be at most 50 characters"),
});

export const EditOrAddStudentFormValidation = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  classGrade: z
    .string()
    .min(2, "Grade must be at least 2 characters")
    .max(50, "Grade must be at most 50 characters")
    .regex(/^((?!Select Grade).)*$/, "Grade is not valid"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must have 10 characters")
    .max(10, "Phone number must have 10 characters")
    .regex(/^\d+$/, "Phone number must be numeric"),
  assignments: z.any().optional(),
});
