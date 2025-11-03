import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    extraDetails: z.string().optional(),
    links: z
        .array(
            z.object({
                link: z.string().url("Invalid link").optional(),
            })
        )
        .optional(),
});
