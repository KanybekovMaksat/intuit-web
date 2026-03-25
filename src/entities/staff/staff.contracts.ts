import z from 'zod'

export const StaffSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  rank: z.string(),
  status: z.string(),
  description: z.string(),
  image: z.string(),
  facebook: z.string(),
  telegram: z.string(),
  instagram: z.string(),
  youtube: z.string(),
  curriculumVitae: z.string(),
  cv: z.string(),
  position: z.object({ id: z.number() }),
  faculty: z.array(z.number()),
})

export const StaffListSchema = z.array(StaffSchema)
