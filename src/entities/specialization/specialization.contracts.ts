import { z } from 'zod'

export const TrainingProgramItemSchema = z.object({
  name: z.string(),
})

export const TrainingProgramSchema = z.object({
  number: z.number().max(2147483647),
  items: z.array(TrainingProgramItemSchema),
})

export const SkillSchema = z.object({
  name: z.string(),
})

export const ToolSchema = z.object({
  name: z.string(),
  logo: z.string(),
  description: z.string(),
})

export const SpecializationSchema = z.object({
  id: z.number(),
  trainingPrograms: z.array(TrainingProgramSchema),
  skills: z.array(SkillSchema),
  tools: z.array(ToolSchema),
  title: z.string(),
  slug: z.string(),
  photo: z.string(),
  text: z.string(),
  subtext: z.string().optional(),
  textPhoto: z.string(),
  studyPeriod: z.string(),
  trainingForm: z.string(),
  employment: z.string(),
  diploma: z.string(),
  educationLevel: z.array(z.number()),
  faculty: z.array(z.number()),
  phoneNumber: z.string().optional(),
  contractPrice: z.string().optional(),
})
