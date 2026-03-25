import { z } from 'zod';
import {
  DegreeSchema,
} from './degree.contracts';

export type DegreeSchema = z.infer<typeof DegreeSchema>;