// src/validators/article.validator.ts
import { z } from 'zod';

export const ArticleSchema = z.object({
  data_id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().nullable(),
  thumbnail: z.string().nullable(),
  origin_url: z.string().url(),
  published_at: z.string().datetime().nullable(),
  category_id: z.number().int().nullable(),
  author: z.string().nullable(),
  created_at: z.string().datetime(),
});

export type Article = z.infer<typeof ArticleSchema>;
