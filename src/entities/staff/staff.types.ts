import { z } from 'zod'
import { StaffSchema, StaffListSchema } from './staff.contracts'

export type Staff = z.infer<typeof StaffSchema>
export type StaffList = z.infer<typeof StaffListSchema>

