// src/validators/category.validator.ts
import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  created_at: z.string().datetime().nullable().optional(), // ISO format validation
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: "Technology"
 *         slug:
 *           type: string
 *           description: URL-friendly slug for the category
 *           example: "technology"
 *         created_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Creation date and time (optional)
 *           example: "2023-10-01T12:00:00Z"
 */
