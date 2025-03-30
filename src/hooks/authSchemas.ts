import { z } from "zod";

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    full_name: z
      .string()
      .min(3, "Full name must be at least 3 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

export const LoginSchema = z.object({
  username_or_email: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});
