import { z } from 'zod';

export const NewsSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  status: z.string(),
  banner: z.string(),
  category: z.array(z.number()),
  categories: z.array(z.object({ id: z.number(), slug: z.string(), title: z.string() })).optional(),
  images: z.array(z.number()),
  files: z.array(z.number())
});
