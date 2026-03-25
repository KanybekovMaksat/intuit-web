import { z } from 'zod'
import { FeedbackListSchema, FeedbackSchema } from './feedback.contracts'

export type Feedback = z.infer<typeof FeedbackSchema>
export type FeedbackList = z.infer<typeof FeedbackListSchema>
