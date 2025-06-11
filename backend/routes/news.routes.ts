import { Router } from 'express';
import { NewsController } from '../controller/news.controller';

const router = Router();

// Get all articles
router.get('/articles', NewsController.getAllArticles);

// Get article by slug
router.get('/articles/:slug', NewsController.getArticleBySlug);

export {router as NewsRouter};
