import { z } from "zod";
import DOMPurify from "dompurify";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const sanitizeInput = (input: string) => {
  return DOMPurify.sanitize(input);
};

export const registerUser = async (data: Record<string, unknown>) => {
  const sanitizedData = {
    username: sanitizeInput(data.username as string),
    email: sanitizeInput(data.email as string),
    full_name: sanitizeInput(data.full_name as string),
    password: sanitizeInput(data.password as string),
    password2: sanitizeInput(data.password2 as string),
  };

  const result = RegisterSchema.safeParse(sanitizedData);
  if (!result.success) {
    return {
      error: result.error.errors.map((err) => err.message).join(", "),
    };
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const apiErrors = responseData?.data
        ? Object.values(responseData.data).flat().join(" ")
        : responseData.message || "Registration failed!";
      return { error: apiErrors };
    }

    return { success: "Registration successful!" };
  } catch {
    return { error: "An error occurred on the server." };
  }
};

export const loginUser = async (data: Record<string, unknown>) => {
  const sanitizedData = {
    username_or_email: sanitizeInput(
      data.username_or_email as string
    ),
    password: sanitizeInput(data.password as string),
  };

  const result = LoginSchema.safeParse(sanitizedData);
  if (!result.success) {
    return {
      error: result.error.errors.map((err) => err.message).join(", "),
    };
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });

    const responseData = await response.json();

    if (response.status === 429) {
      return {
        error: "Too many login attempts. Please try again later.",
      };
    }

    if (!response.ok) {
      const apiErrors = responseData?.data
        ? Object.values(responseData.data).flat().join(" ")
        : responseData.message || "Login failed";
      return { error: apiErrors };
    }

    return { success: "Login successful!" };
  } catch {
    return { error: "An error occurred on the server." };
  }
};
