import { z } from 'zod'

export const SpeakerSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  preview: z.string(),
  videoUrl: z.string(),
  faculty: z.array(z.number()).optional(),
  educationLevel: z.array(z.number()).optional(),
})

export const SpeakerListSchema = z.array(SpeakerSchema)
