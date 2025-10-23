import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required").default(""),
    description: z.string().min(1, "Description is required").default(""),
    extraDetails: z.string().optional().default(""),
    links: z
        .array(
            z.object({
                link: z.url("Invalid link"),
            })
        )
        .default([]),
})
