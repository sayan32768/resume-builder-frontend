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
    skills: z.array(skillSchema).min(1, "At least one skill is required").default([skillSchema.parse({})]),
    professionalExperience: z.array(experienceSchema).optional().default([experienceSchema.parse({})]),
    projects: z.array(projectSchema).optional().default([projectSchema.parse({})]),
    otherExperience: z.array(experienceSchema).optional().default([experienceSchema.parse({})]),
    certifications: z.array(certificationSchema).optional().default([certificationSchema.parse({})])
});
