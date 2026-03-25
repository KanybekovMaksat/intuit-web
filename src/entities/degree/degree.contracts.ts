import { z } from 'zod';

export const DegreeSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  banner: z.string(),
  text: z.string(),
  subtext: z.string(),
  programCount: z.string(),
  studyPeriod: z.string(),
  employment: z.string(),
  diploma: z.string(),
});
