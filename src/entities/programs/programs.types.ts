import { z } from 'zod';
import { ProgramSchema } from './programs.contracts';

export type ProgramSchema = z.infer<typeof ProgramSchema>;
