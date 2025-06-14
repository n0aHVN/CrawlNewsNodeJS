import { Router } from "express";
import { CategoriesController } from "../controller/categories.controller";
import { requestValidate } from "../middleware/RequestValidate";
import { CategorySchema } from "../dto/category.validator";

const router= Router();
// Get all categories
router.get('/categories',CategoriesController.getAllCategories);

router.post('/categories',requestValidate(CategorySchema), CategoriesController.addCategory);
// Get category by slug
router.get('/categories/:slug', CategoriesController.getCategoryIdBySlug);
export {router as CategoriesRouter}