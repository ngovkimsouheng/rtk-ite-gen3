import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    phoneNumber: z.string().min(8, "Phone number is too short"),

    address: z.object({
      addressLine1: z.string().min(1, "Address Line 1 is required"),
      addressLine2: z.string().optional(),
      road: z.string().min(1, "Road is required"),
      linkAddress: z.string().url("Must be a valid URL"),
    }),

    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    profile: z.string().url("Must be a valid URL").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof registerSchema>;
