import { z } from 'zod'
import { SpecializationSchema } from './specialization.contracts'

export type Specialization = z.infer<typeof SpecializationSchema>

