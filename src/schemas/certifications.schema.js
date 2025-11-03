import { z } from "zod";

export const certificationSchema = z.object({
    issuingAuthority: z.string().optional(),
    title: z.string().optional(),
    issueDate: z.date().nullable().optional().refine(
        (obj) => {
            if (!obj) return true;
            return obj < new Date();
        },
        { message: "Enter a valid date" }
    ),
    link: z.string().url().optional(),
});
