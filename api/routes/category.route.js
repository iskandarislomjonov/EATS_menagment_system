import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isRestaurant } from "../middlewares/isRestaurant.js";
import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from "../controller/category.controller.js";
export const router = Router();

// Rakhmatov07

router.get('/category', isAdmin || isRestaurant, getCategories);
router.get('/category/:categoryId', isAdmin || isRestaurant, getCategory);

router.post('/category', isAdmin || isRestaurant, createCategory);

router.put('/category/:categoryId', isAdmin || isRestaurant, editCategory);

router.delete('/category/:categoryId', isAdmin || isRestaurant, deleteCategory);




