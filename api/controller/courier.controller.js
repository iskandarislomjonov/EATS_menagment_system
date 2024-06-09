import { Courier } from "../../models/courier.model.js";
import { courierLoginValidation, courierRegisterValidation } from "../../validation/courier.validation.js";
import { CustomError } from "../../utilities/customError.js";
import { comparePayload, hashPayload } from "../../utilities/bcrypt.js";
import { signPayload } from "../../utilities/jwt.js";
import { Order } from "../../models/order.model.js";

export async function register(req, res, next) {
    try {
        const { firstname, lastname, phoneNumber, password } = req.body; // format phone: +998 90 123 4343
        const isValid = courierRegisterValidation({ firstname, lastname, phoneNumber, password });

        if(isValid) throw new CustomError(isValid, 400);
        const findCourier = await Courier.findOne({ phoneNumber });

        if(findCourier){
            throw new CustomError('Phone number already registered!', 409);
        }

        const hashedPass = await hashPayload(password);
        const newCourier = await Courier.create({ firstname, lastname, phoneNumber, password: hashedPass});
 
        const token = signPayload(newCourier._id + '');
        res.cookie('token', token);
        res.status(201).json({message: 'Successfully registered'});
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const { phoneNumber, password } = req.body; // format phone: +998 90 123 4343
        const isValid = courierLoginValidation({ phoneNumber, password });

        if(isValid) throw new CustomError(isValid, 400);
        const findCourier = await Courier.findOne({ phoneNumber });

        if(!findCourier) throw new CustomError('Incorrect phone number!', 409);

        const checkPass = await comparePayload(password, findCourier.password);
        
        if(!checkPass) throw new CustomError('Invalid password', 409);

        const token = signPayload(findCourier._id + '');
        res.cookie('token', token);
        res.status(201).json({message: 'Successfully logged in'});
    } catch (error) {
        next(error);
    }
}

export async function logout(req, res, next) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        next(error);
    }
}

export const getProfile = async(req, res, next) => {
    try {
        const { _id } = req.courier;
        const courier = await Courier.findById(_id);
        if(!courier){
            throw new CustomError('Not found', 404);
        }

        res.status(200).json({ message: 'Success', courier });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async(req, res, next) => {
    try {
        const { phoneNumber, currentPassword, newPassword, confirmPassword } = req.body;
        const findCourier = await Courier.findOne({ phoneNumber });
        if(!findCourier){
            throw new CustomError('Incorrect phone number', 409);
        }

        const checkPass = await comparePayload(currentPassword, findCourier.password);
        if(!checkPass){
            throw new CustomError('Invalid Password', 409);
        }

        if(newPassword !== confirmPassword){
            throw new CustomError('Password does not match', 409);
        }

        const hashedPass = await hashPayload(newPassword);
        await Courier.findOneAndUpdate({ phoneNumber }, {
            $set: {
                password: hashedPass
            }
        });

        return res.status(200).json({ message: 'Successfully changed'});
    } catch (error) {
        next(error);
    }
};

export const editProfile = async(req, res, next) => {
    try {
        const { _id } = req.courier;
        const { firstname, lastname, phoneNumber } = req.body;
        const courier = await Courier.findById({ _id });

        if(!courier){
            throw new CustomError('Not found', 404);
        }

        const updCourier = await Courier.findByIdAndUpdate(_id, { 
            $set: {
                firstname,
                lastname,
                phoneNumber
            }
        }, 
        {
            new: true
        });
        
        return res.status(200).json({ message: 'Successfully edited', updCourier });
    } catch (error) {
        next(error);
    }
};

export async function changeCourierStatus(req, res, next){
    try {
        const { courierId } = req.body;
        await Courier.findByIdAndUpdate(courierId, { isActive: true });

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
}


export async function getOrdersByStatus(req, res, next) {
    try {
        const { _id } = req.courier;
        const { status } = req.body;

        const orders = await Order.find({ courierId: _id, status });
        if(orders.length === 0) throw new CustomError('Not Found', 404);

        res.status(200).json({ message: 'Success', orders });
    } catch (error) {
        next(error);   
    }
}

export async function getOrder(req, res, next) {
    try {
        const { orderId } = req.params;
        const { _id } = req.courier;

        const order = await Order.findById(orderId, { courierId: _id });
        if(!order) throw new CustomError('Not Found', 404);

        res.status(200).json({ message: 'Success', order });
    } catch (error) {
        next(error);
    }
}



