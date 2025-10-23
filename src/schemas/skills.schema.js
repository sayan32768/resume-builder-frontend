import { z } from "zod";

export const skillSchema = z.object({
    skillName: z.string().min(1, "Enter a skill").default("")
})
