// src/validators/category.validator.ts
import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  created_at: z.string().datetime().nullable().optional(), // ISO format validation
});

export type Category = z.infer<typeof CategorySchema>;