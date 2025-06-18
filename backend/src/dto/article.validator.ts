// src/validators/article.validator.ts
import { z } from 'zod';

export const ArticleSchema = z.object({
  data_id: z.string(),
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().nullable(),
  origin_url: z.string().url(),
  published_at: z.string().datetime().nullable(),
  category_id: z.number().int().nullable(),
  author: z.string().nullable(),
});

export type Article = z.infer<typeof ArticleSchema>;

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         data_id:
 *           type: string
 *           description: Unique identifier for the article
 *           example: "12345"
 *         title:
 *           type: string
 *           description: Title of the article
 *           example: "Breaking News: Example Article"
 *         slug:
 *           type: string
 *           description: URL-friendly slug for the article
 *           example: "breaking-news-example-article"
 *         content:
 *           type: string
 *           nullable: true
 *           description: HTML content of the article
 *           example: "<p>This is an example article content.</p>"
 *         origin_url:
 *           type: string
 *           format: url
 *           description: Original source URL
 *           example: "https://www.example.com/original-article"
 *         published_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Publication date and time
 *           example: "2023-10-01T12:00:00Z"
 *         category_id:
 *           type: integer
 *           nullable: true
 *           description: Category ID
 *           example: 1
 *         author:
 *           type: string
 *           nullable: true
 *           description: Author of the article
 *           example: "John Doe"
 */

