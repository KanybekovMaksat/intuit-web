import { z } from 'zod'

export const EventSchema = z.object({
  title: z.string(),
  status: z.string(),
  slug: z.string(),
  description: z.string(),
  createdAt: z.string(),
  banner: z.string(),
})

export const EventListSchema = z.array(EventSchema)
