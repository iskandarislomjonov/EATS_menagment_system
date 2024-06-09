import { Schema, Types, model } from "mongoose";

const cardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true,
        unique: true
    },
    issueDate: {
        month: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    cvv: {
        type: Number,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        required: true,
        unique: true,
        ref: "User"
    }
});

export const Card =  model('Card', cardSchema);