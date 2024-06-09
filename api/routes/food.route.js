import { Router } from "express";
import { isRestaurant } from "../middlewares/isRestaurant.js";
import {
  addFood,
  deleteFood,
  editFood,
  getFood,
  getFoodByCategory,
  getFoodByRestaurant,
  getOneFood,
} from "../controller/food.controller.js";
export const router = Router();


router.get("/food", getFood); // get all food with pagination
router.get("/food/category/:categoryId", getFoodByCategory); // get all with their category
router.get("/food/restaurant/:restaurantId", getFoodByRestaurant); // get all with their restaurant
router.get("/food/:foodId", getOneFood); // get only with one food
// Muhammad



router.post("/food", isRestaurant, addFood); // add new food

router.put("/food/:foodId",isRestaurant, editFood); // edit added food

router.delete("/food/:foodId", deleteFood); // delete food from database
