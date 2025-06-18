import { Request, Response } from "express";
import type { Category } from "../dto/category.validator";
import { InternalError } from "../error/internal.error";
import pool from "../sql/db-pool";
import { NotFoundError } from "../error/not-found.error";

export class CategoriesController{
    static async getAllCategories(req: Request, res: Response) {
        const result = await pool.query('SELECT * FROM categories ORDER BY id');
        res.status(200).json(result.rows as Category[]);
    }
    static async getCategoryIdBySlug(req: Request, res: Response){
        const result = await pool.query('SELECT id FROM categories WHERE slug = $1', [req.params.slug]);
        if (result.rowCount === 0) {
            throw new NotFoundError("Cannot find Category by slug");
        }
        res.status(200).json(result.rows[0]);
    }
    static async addCategory(req: Request, res: Response) {
        const { name, slug } = req.body;
        const isExist = await CategoriesController.checkIfExist(name, slug);
        console.log("isExist:", isExist); // Debug log
        if (isExist) throw new InternalError("Categories is exist");
        const result = await pool.query(
            'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
            [name, slug]
        );
        res.status(201).json(result.rows[0]);
    }

    static async checkIfExist(name: string, slug: string): Promise<boolean> {
        console.log("Log check from checkIfExist");
            const result = await pool.query(
                'SELECT 1 FROM categories WHERE name = $1 OR slug = $2 LIMIT 1',
                [name, slug]
            );
        return result.rowCount! > 0;
    }
}