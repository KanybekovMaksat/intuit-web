import { z } from 'zod'
import { EventListSchema, EventSchema } from './event.contracts'

export type Event = z.infer<typeof EventSchema>
export type EventList = z.infer<typeof EventListSchema>
