import { Router } from "express";
import { CategoriesController } from "../controller/categories.controller";

const router= Router();
// Get all categories
router.get('/categories', CategoriesController.getAllCategories);


export {router as CategoriesController}