import { Router } from 'express';
import { NewsController } from '../controller/news.controller';
import { requestValidate } from '../middleware/RequestValidate';
import { ArticleSchema } from '../dto/article.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API endpoints for managing news articles
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 */
router.get('/articles', NewsController.getAllArticles);

/**
 * @swagger
 * /articles/{slug}:
 *   get:
 *     summary: Get article by slug
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The article slug
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
router.get('/articles/:slug', NewsController.getArticleBySlug);

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Add a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid input
 */
router.post('/articles',requestValidate(ArticleSchema), NewsController.addArticle);

/**
 * @swagger
 * /articles/check/{data_id}:
 *   get:
 *     summary: Check if article exists by data_id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: data_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article data_id
 *     responses:
 *       200:
 *         description: Existence check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 */
router.get('/articles/check/:data_id', NewsController.checkIfExist);

/**
 * @swagger
 * /categories/{category_slug}/articles:
 *   get:
 *     summary: Get articles by category slug
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: category_slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The category slug
 *     responses:
 *       200:
 *         description: List of articles in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       404:
 *         description: Category or articles not found
 */
router.get('/categories/:category_slug/articles', NewsController.getArticlesByCategorySlug);

export {router as NewsRouter};
