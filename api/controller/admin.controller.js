import { CustomError } from "../../utilities/customError.js";
import {Order}  from "../../models/order.model.js"

export const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email !== "admin4546@gmail.com") throw new CustomError("Not Allowed");
    res.status(200).json({ msg: "Successfully logged in" });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByStatus = async (req,res,next) =>{
    try {
        
    } catch (error) {
        next(error)
    }
}