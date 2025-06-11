// src/validators/category.validator.ts
import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().min(1),
  slug: z.string().min(1),
  created_at: z.string().datetime(), // ISO format validation
});

export type Category = z.infer<typeof CategorySchema>;