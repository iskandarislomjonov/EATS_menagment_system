import { Schema, Types, model } from 'mongoose';

const orderSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    foodId: {
        type: Types.ObjectId,
        required: true,
        ref: "Food"
    },
    courierId: {
        type: Types.ObjectId,
        ref: "Courier"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: [ 'new', 'onDuty', 'accepted' ],
        default: 'new'
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    }
}, 
{
    timestamps: true
});

export const Order = model('Order', orderSchema);
