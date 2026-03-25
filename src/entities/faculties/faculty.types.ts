import { z } from 'zod';
import { FacultySchema } from './faculty.contracts';

export type FacultySchema = z.infer<typeof FacultySchema>;
