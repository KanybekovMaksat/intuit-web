import { z } from 'zod';

export const ProgramSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  text: z.string(),
  subtext: z.string(),
  programCount: z.string(),
  studyPeriod: z.string(),
  employment: z.string(),
  diploma: z.string(),
  trainingForm: z.string(),
  tools: z.array(
    z.object({
      name: z.string(),
      logo: z.string(),
    })
  ),
  skills: z.array(
    z.object({
      name: z.string(),
    })
  ),
  educationLevel: z.array(z.number()),
  faculty: z.array(z.number()),
});
