import { Schema, model } from 'mongoose';

const foodCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

export const FoodCategory = model('FoodCategory', foodCategorySchema);