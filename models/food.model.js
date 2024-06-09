import { Schema, Types, model } from 'mongoose';

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    foodCategoryId: {
        type: Types.ObjectId,
        required: true,
        ref: "FoodCategory"
    },
    restaurantId: {
        type: Types.ObjectId,
        required: true,
        ref: "Restaurant"
    }
}, 
{
    timestamps: true
});

export const Food = model('Food', foodSchema);