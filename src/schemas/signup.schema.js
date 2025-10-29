import { z } from "zod";

export const signupSchema = z
    .object({
        fullName: z.string().min(1, "Full name is required").default(""),
        // username: z.string().min(1, "Username is required").trim().default("username"),
        email: z.email("Invalid email").transform((value) => value.toLowerCase()).default(""),
        password: z.string().min(8, "Password must be at least 8 characters").default(""),
        confirmPassword: z.string().default(""),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });