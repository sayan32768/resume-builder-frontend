import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email").transform((value) => value.toLowerCase()).default(""),
    password: z.string().min(8, "Password must be at least 8 characters").default(),
});
