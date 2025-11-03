import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const personalFormSchema = z.object({
    fullName: z
        .string()
        .optional()
        .transform((v) => {
            if (!v) return undefined; // keep undefined if empty
            return v
                .trim()
                .replace(/\s+/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
        })
        .refine((v) => !v || /^[a-zA-Z\s]+$/.test(v), {
            message: "Only letters and spaces are allowed",
        }),

    email: z
        .string()
        .optional()
        .transform((v) => (v ? v.toLowerCase().trim() : undefined))
        .refine((v) => !v || /^\S+@\S+$/.test(v), { message: "Invalid email address" }),

    phone: z
        .string()
        .optional()
        .refine((v) => {
            if (!v) return true;
            const phoneNumber = parsePhoneNumberFromString(v);
            return phoneNumber?.isValid() ?? false;
        }, { message: "Invalid phone number" }),

    address: z.string().optional(),
    about: z.string().optional(),

    socials: z
        .array(
            z.object({
                name: z.enum(["LINKEDIN", "INSTAGRAM", "GITHUB"]).optional(),
                link: z.string().url("Invalid link").optional(),
            })
        )
        .optional(),
});
