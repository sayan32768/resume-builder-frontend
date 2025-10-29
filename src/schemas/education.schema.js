import { z } from "zod";

export const educationFormSchema = z.object({
    name: z.string().default(""),
    degree: z
        .string()
        .min(1, "Degree is required").default(""),

    dates: z.object({
        startDate: z.date().optional().nullable(),
        endDate: z.date().optional().nullable(),
    }).optional().refine((obj) => {
        if (!obj?.startDate || !obj?.endDate) return true;
        return (obj.startDate < obj.endDate)
    }, {
        message: "Enter valid dates",
        path: []
    }),
    location: z.string().default(""),
    grades: z.object({
        type: z.enum(["Percentage", "CGPA"], { message: "Select a type" }).optional(),
        score: z.string().optional(),
        message: z.string().optional()
    }).optional().refine((grade) => {
        if (grade?.score && !grade?.type || grade?.type && !grade?.score) {
            return false
        }
        return true
    }, {
        message: "Both score and type is required",
    })
});
