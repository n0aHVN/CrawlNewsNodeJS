import { Request, Response } from "express";
import type { Category } from "../dto/category.validator";
import { InternalError } from "../error/internal.error";
import pool from "../sql/db-pool";

export class CategoriesController{
    static async getAllCategories(req: Request, res: Response) {
        try {
            const result = await pool.query('SELECT * FROM categories ORDER BY id');
            res.status(201).json(result.rows as Category[]);
        } catch (err: any) {
            throw new InternalError("Cannot Get Categories")
        }
    }
    
    static async addCategory(req: Request, res: Response) {
        try {
            const { name, slug } = req.body;
            const result = await pool.query(
                'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
                [name, slug]
            );
            res.status(201).json(result.rows[0]);
        } catch (err: any) {
            throw new InternalError("Cannot Add Category");
        }
    }
}