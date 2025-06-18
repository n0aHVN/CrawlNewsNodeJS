import { Request, Response } from 'express';
import pool from '../sql/db-pool';

import { InternalError } from '../error/internal.error';
import { NotFoundError } from '../error/not-found.error';
import { Article } from '../dto/article.validator';
import { logger } from '../utils/logger';

export class NewsController {
    static async getAllArticles(req: Request, res: Response) {
        try {
            // Pagination parameters
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = 10;
            const result = await pool.query('SELECT * FROM articles ORDER BY published_at DESC LIMIT $1 OFFSET $2', [pageSize, (page - 1) * pageSize]);
            res.json({
                articles: result.rows,
                totalPages: Math.ceil(result.rowCount! / pageSize)
            });
        } catch (err: any) {
            logger.error(err);
            throw new InternalError("Cannot Get Articles")
        }
    }

    static async getArticleBySlug(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            const result = await pool.query('SELECT * FROM articles WHERE slug = $1', [slug]);
            if (result.rows.length === 0) {
                throw new NotFoundError();
            }
            res.json(result.rows[0] as Article);
        } catch (err: any) {
            logger.error(err);
            throw new InternalError("Cannot Get Articles")
        }
    }

    static async addArticle(req: Request, res: Response) {
        try {
            const { data_id, title, content, slug, category_id, origin_url, author, published_at } = req.body;
            const result = await pool.query(
                `INSERT INTO articles (data_id, title, content, slug, category_id, origin_url, author, published_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING *`,
                [data_id, title, content, slug, category_id, origin_url, author, published_at]
            );
            res.status(201).json(result.rows[0] as Article);
        } catch (err: any) {
            logger.error(err);
            throw new InternalError("Cannot Add Article")
        }
    }

    static async checkIfExist(req: Request, res: Response)  {
        try {
            const { data_id } = req.params;
            const result = await pool.query('SELECT 1 FROM articles WHERE data_id = $1 LIMIT 1', [data_id]);
            res.json({ exists: result.rowCount! > 0 });
        } catch (err: any) {
            logger.error(err);
            throw new InternalError("Cannot Check Article Existence");
        }
    }
    
}
