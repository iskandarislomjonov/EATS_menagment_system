import { Courier } from "../../models/courier.model.js";
import { CustomError } from "../../utilities/customError.js";
import { verifyPayload } from "../../utilities/jwt.js";

export async function isCourier(req, _, next) {
    try {
        const { token } = req.cookies;
        const courierId = verifyPayload(token);
        if(!courierId) throw new CustomError("Invalid Token", 403); // Use CutomError to return error response
    
        const courier = await Courier.findOne({ _id: courierId });
        if(!courier) throw new CustomError('Courier Not Found', 404);

        req.courier = courier;  // const { _id } = req.courier; getting courierId on controller file
        next();
    } catch (error) {
        next(error);
    }
}