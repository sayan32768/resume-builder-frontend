import { z } from "zod";

export const certificationSchema = z.object({
    issuingAuthority: z.string().min(1, "This is a required field").default(""),
    title: z.string().min(1, "Title is required").default(""),
    issueDate: z.date().nullable().optional().refine((obj) => {
        if (!obj) return true;
        return (obj < new Date())
    }, {
        message: "Enter a valid date",
    }),
    link: z.url().or(z.literal("")).default("")
})
