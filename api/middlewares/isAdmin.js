import { User } from "../../models/user.model.js";

import { CustomError } from "../../utilities/customError.js";
import { verifyPayload } from "../../utilities/jwt.js";

export async function isAdmin(req, _, next) {
    try {
        const { token } = req.cookies;
        const adminId = verifyPayload(token);
        if(!adminId) throw new CustomError("Invalid Token", 403); // Use CutomError to return error response
        
        const admin = await User.findOne({ _id: adminId });
        if(!admin) throw new CustomError('User Not Found', 404);

        if(admin.email !== "admin4546@gmail.com") throw new CustomError('Not Allowed');

        req.admin = admin;  // const { _id } = req.admin; getting adminId on controller file
        next();
    } catch (error) {
        next(error);
    }
}