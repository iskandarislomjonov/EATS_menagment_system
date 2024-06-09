import { FoodCategory } from "../../models/foodCategory.model.js";
import { CustomError } from "../../utilities/customError.js";
import { categoryValidation } from "../../validation/category.validation.js";

export async function getCategories(_, res, next){
    try {
        const categories = await FoodCategory.find();

        if(!categories.length) throw new CustomError('Not Found', 404);

        res.status(200).json({ message: 'Success', categories });
    } catch (error) {
        next(error);
    }
}

export async function getCategory(req, res, next){
    try {
        const { categoryId } = req.params;
        const category = await FoodCategory.findById({ _id: categoryId });

        if(!category) throw new CustomError('Not Found', 404);

        res.status(200).json({ message: 'Success', category });
    } catch (error) {
        next(error);
    }

}

export async function createCategory(req, res, next){
    try {
        const { name } = req.body;
        const isValid = categoryValidation(name);
        if(isValid) throw new CustomError('Invalid Input', 400);

        let category = await FoodCategory.findOne({ name });
        if(category) throw new CustomError(`${name} category already exist`, 409);

        category = await FoodCategory.create({ name });
        res.status(201).json({ message: 'Success', category }); 
    } catch (error) {
        next(error);
    }
}

export async function editCategory(req, res, next){
    try {
        const { categoryId } = req.params;
        const { name } = req.body;
        const isValid = categoryValidation(name);
        if(isValid) throw new CustomError('Invalid Input', 400);

        const updCategory = await FoodCategory.findById(categoryId, { name });

        res.status(200).json({ message: 'Success', updCategory });
    } catch (error) {
        next(error);
    }

}

export async function deleteCategory(req, res, next){
    try {
        const { categoryId } = req.params;
        const deletedCategory = await FoodCategory.findByIdAndDelete(categoryId);

        res.status(200).json({ message: 'Success', deletedCategory });
    } catch (error) {
        next(error);
    }
}