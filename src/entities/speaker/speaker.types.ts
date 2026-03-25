import { z } from 'zod'
import { SpeakerListSchema, SpeakerSchema } from './speaker.contracts'

export type Speaker = z.infer<typeof SpeakerSchema>
export type SpeakerList = z.infer<typeof SpeakerListSchema>