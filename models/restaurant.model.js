import { Schema, Types, model } from 'mongoose';

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mainOfficeId: {
        type: Types.ObjectId,
        ref: "Restaurant"
    },
    stir: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        lat: {
            type: String,
        },
        long: {
            type: String,
        }
    },
    image: {
        type: String,
        required: true
    },
    bussinessHours: {
        from: {
            type: String,
        },
        to: {
            type: String,
        }
    },
    isActive: {
        type: Boolean,
        default: false
    },
    emailVerifyCode:{
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

export const Restaurant = model('Restaurant', restaurantSchema);