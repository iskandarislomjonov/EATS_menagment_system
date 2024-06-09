import { Restaurant } from "../../models/restaurant.model.js";
import { CustomError } from "../../utilities/customError.js";
import { verifyPayload } from "../../utilities/jwt.js";

export async function isRestaurant(req, _, next) {
  try {
    const { token } = req.cookies;
    const { userId } = verifyPayload(token);
    if (!userId) throw new CustomError("Invalid Token", 403); // Use CutomError to return error response

    const restaurant = await Restaurant.findOne({ _id: userId });
    if (!restaurant) throw new CustomError("Restaurant Not Found", 404);
    req.restaurant = restaurant; // const { _id } = req.restaurant; getting restaurantId on controller file
    next();
  } catch (error) {
    next(error);
  }
}
