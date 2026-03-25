import { z } from 'zod'
import { PartnerListSchema, PartnerSchema } from './partner.contracts'

export type Partner = z.infer<typeof PartnerSchema>
export type PartnerList = z.infer<typeof PartnerListSchema>
