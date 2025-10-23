import { z } from "zod";

export const experienceSchema = z.object({
    companyName: z.string().min(1, "Name is required").default(""),
    companyAddress: z.string().optional().default(""),
    position: z.string().optional().default(""),
    dates: z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
    }).optional().refine((obj) => {
        if (!obj?.startDate || !obj?.endDate) return true;
        return (obj.startDate < obj.endDate)
    }, {
        message: "Enter valid dates",
        path: []
    }),
    workDescription: z.string().optional().default(""),
})
