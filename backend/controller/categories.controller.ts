import { Request, Response } from "express";
import { CategoryDto } from "../dto/article-category.dto";
import { InternalError } from "../error/internal.error";
import pool from "../src/db-pool";

export class CategoriesController{
    static async getAllCategories(req: Request, res: Response) {
        try {
            const result = await pool.query('SELECT * FROM categories ORDER BY id');
            res.json(result.rows as CategoryDto[]);
        } catch (err: any) {
            throw new InternalError("Cannot Get Categories")
        }
    }
}