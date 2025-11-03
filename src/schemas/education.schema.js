import { z } from "zod";

export const educationFormSchema = z.object({
    name: z.string().optional(),
    degree: z.string().optional(),

    dates: z
        .object({
            startDate: z.date().optional().nullable(),
            endDate: z.date().optional().nullable(),
        })
        .optional()
        .refine(
            (obj) => {
                if (!obj?.startDate || !obj?.endDate) return true;
                return obj.startDate < obj.endDate;
            },
            {
                message: "Enter valid dates",
                path: [],
            }
        ),

    location: z.string().optional(),

    grades: z
        .object({
            type: z.enum(["Percentage", "CGPA"], { message: "Select a type" }).optional(),
            score: z.string().optional(),
            message: z.string().optional(),
        })
        .optional()
        .refine(
            (grade) => {
                if ((grade?.score && !grade?.type) || (grade?.type && !grade?.score)) return false;


                const scoreNum = parseFloat(grade?.score || "");
                if (isNaN(scoreNum)) return true;

                if (grade?.type === "CGPA" && (scoreNum < 0 || scoreNum > 10)) return false;
                if (grade?.type === "Percentage" && (scoreNum < 0 || scoreNum > 100)) return false;

                return true;
            },
            {
                message: "Enter a valid score based on the selected type",
            }
        ),
});
