import { z } from "zod";

export const LoginFormValidation = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  id: z
    .string()
    .length(9, "ID is not valid")
    .regex(/^(0|[1-9][0-9]*)$/, "ID must be numeric"),
});

export const EditOrAddStudentFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  classGrade: z.string().min(2).max(50),
  phoneNumber: z
    .string()
    .min(10, "Phone number must have 10 characters")
    .max(10, "Phone number must have 10 characters")
    .regex(/^(0|[1-9][0-9]*)$/, "Phone number must be numeric"),
});
