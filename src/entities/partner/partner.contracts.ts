import { z } from 'zod'

export const PartnerSchema = z.object({
  id: z.number(),
  title: z.string(),
  logo: z.string(),
  faculty: z.array(z.number()).optional(),
})

export const PartnerListSchema = z.array(PartnerSchema)
