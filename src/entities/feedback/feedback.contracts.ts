import { z } from 'zod'

export const FeedbackSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  photo: z.string().url(),
  faculty: z.array(z.number()).optional(),
  educationLevel: z.array(z.number()).optional(),
})

export const FeedbackListSchema = z.array(FeedbackSchema)
