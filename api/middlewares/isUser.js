import { User } from "../../models/user.model.js";
import { CustomError } from "../../utilities/customError.js";
import { verifyPayload } from "../../utilities/jwt.js";

export async function isUser(req, _, next) {
    try {
        const { token } = req.cookies;
        const userId = verifyPayload(token);
        if(!userId) throw new CustomError("Invalid Token", 403); // Use CutomError to return error response
        
        const user = await User.findOne({ _id: userId });
        if(!user) throw new CustomError('User Not Found', 404);

        req.user = user;  // const { _id } = req.user; getting userId on controller file
        next();
    } catch (error) {
        next(error);
    }
}