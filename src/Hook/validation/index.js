import { z } from "zod";

export const schemaSignIn = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
});

export const schemaSignUp = z.object({
  firstName:z
  .string()
  .nonempty("firstName is required"),
  lastName:z
  .string()
  .nonempty("lastName is required"),
  userName:z
  .string()
  .nonempty("userName is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
});

export const schemaUpdateUser = z.object({
  firstName:z
  .string()
  .nonempty("firstName is required"),
  lastName:z
  .string()
  .nonempty("lastName is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
});

export const schemaUpdatePassword = z.object({
    oldPassword: z
      .string()
      .min(8, "OldPassword must be at least 8 characters long")
      .nonempty("Password is required"),
    newPassword: z
      .string()
      .min(8, "NewPassword must be at least 8 characters long")
      .nonempty("Password is required"),
});

// ========== chat
export const schemaChat = z.object({
  title: z
  .string()
  .nonempty("title is required"),
});
