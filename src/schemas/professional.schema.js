import { z } from "zod";

export const experienceSchema = z.object({
    companyName: z.string().optional(),
    companyAddress: z.string().optional(),
    position: z.string().optional(),
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
    workDescription: z.string().optional(),
});
