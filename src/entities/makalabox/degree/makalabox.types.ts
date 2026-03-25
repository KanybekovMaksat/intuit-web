import { z } from 'zod';
import { ArticleSchema, ArticlesList } from './makalabox.contracts';

export type Article = z.infer<typeof ArticleSchema>;
export type ArticlesList = z.infer<typeof ArticlesList>;