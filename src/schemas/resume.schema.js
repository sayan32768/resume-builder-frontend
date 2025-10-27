import { z } from "zod";
import { personalFormSchema } from "./personal.schema";
import { educationFormSchema } from "./education.schema";
import { skillSchema } from "./skills.schema";
import { experienceSchema } from "./professional.schema";
import { projectSchema } from "./project.schema";
import { certificationSchema } from "./certifications.schema";

export const resumeSchema = z.object({
    // resumeType: z.enum(["Classic", "Modern"], {
    //     message: "Choose a valid resume type"
    // }),
    personalDetails: personalFormSchema.default({}),
    educationDetails: z.array(educationFormSchema).min(1, "At least one education is required").default([educationFormSchema.parse({})]),
    skills: z.array(skillSchema).optional(),
    professionalExperience: z.array(experienceSchema).optional(),
    projects: z.array(projectSchema).optional(),
    otherExperience: z.array(experienceSchema).optional(),
    certifications: z.array(certificationSchema).optional(),
})
    .strict()
    .strip();
