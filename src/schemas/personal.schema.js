import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const personalFormSchema = z.object({
    fullName: z
        .string()
        .default("")
        .transform((v) =>
            v
                .trim()
                .replace(/\s+/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())
        )
        .refine((v) => v.length > 0, { message: "Name is required" })
        .refine((v) => /^[a-zA-Z\s]+$/.test(v), {
            message: "Only letters and spaces are allowed",
        }),

    email: z
        .string()
        .min(1, "Email is required")
        .regex(/^\S+@\S+$/i, "Invalid email address")
        .transform((value) => value.toLowerCase().trim()).default(""),
    phone: z
        .string()
        .min(1, "Phone is required")
        .refine(
            (value) => {
                const phoneNumber = parsePhoneNumberFromString(value);
                if (!phoneNumber) return false;
                return phoneNumber.isValid();
            },
            {
                message: "Invalid phone number",
            }
        ).default(""),
    address: z.string().optional().or(z.literal("")).default(""),
    about: z.string().optional().or(z.literal("")).default(""),
    socials: z
        .array(
            z.object({
                name: z.enum(["LINKEDIN", "INSTAGRAM", "GITHUB"]),
                link: z.url("Invalid link"),
            })
        )
        .default([]),
});
