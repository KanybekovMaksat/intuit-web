import { z } from 'zod';
import { NewsSchema } from './news.contracts';

export type FacultySchema = z.infer<typeof NewsSchema>;
