import { z } from "zod";

export const LoginFormValidation = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  id: z.string().length(9, "ID is not valid"),
});
