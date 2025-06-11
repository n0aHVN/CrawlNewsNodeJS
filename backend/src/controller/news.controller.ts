import { Request, Response } from 'express';
import pool from '../sql/db-pool';

import { InternalError } from '../error/internal.error';
import { NotFoundError } from '../error/not-found.error';
import { Article } from '../dto/article.validator';

export class NewsController {
    static async getAllArticles(req: Request, res: Response) {
        try {
            const result = await pool.query('SELECT * FROM articles ORDER BY published_at DESC');
            res.json(result.rows as Article[]);
        } catch (err: any) {
            console.log(err);
            
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
            throw new InternalError("Cannot Get Articles")
        }
    }

    static async addArticle(req: Request, res: Response) {
        try {
            const { title, content, slug, category_id, published_at } = req.body;
            const result = await pool.query(
                `INSERT INTO articles (title, content, slug, category_id, published_at)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
                [title, content, slug, category_id, published_at]
            );
            res.status(201).json(result.rows[0] as Article);
        } catch (err: any) {
            throw new InternalError("Cannot Add Article")
        }
    }

    
}
