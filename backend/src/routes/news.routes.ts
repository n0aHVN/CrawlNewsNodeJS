import { Router } from 'express';
import { NewsController } from '../controller/news.controller';
import { requestValidate } from '../middleware/RequestValidate';
import { ArticleSchema } from '../dto/article.validator';

const router = Router();

// Get all articles
router.get('/articles', NewsController.getAllArticles);

// Get article by slug
router.get('/articles/:slug', NewsController.getArticleBySlug);

router.post('/articles',requestValidate(ArticleSchema), NewsController.addArticle);

export {router as NewsRouter};
