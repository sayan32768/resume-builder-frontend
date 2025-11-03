import { z } from "zod";

export const skillSchema = z.object({
    skillName: z.string().optional(),
});
