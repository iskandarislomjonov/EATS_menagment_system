import { Router } from "express";
import { isRestaurant } from "../middlewares/isRestaurant.js";
import { changePassword, editRestaurant, getRestaurant, getRestaurants, login, logout, register, verifyEmail } from "../controller/restaurant.controller.js";

export const router = Router();

// Aziko-Dev

router.get('/restaurant', getRestaurants); // send restaurants by isActive: true
router.get('/restaurant/:restaurantId', getRestaurant);

router.post('/restaurant/register', register);
router.post('/restaurant/verifycode', verifyEmail);
router.post('/restaurant/login', login);

router.put('/restaurant/edit', isRestaurant,  editRestaurant);
router.put('/restaurant/password', isRestaurant, changePassword);

router.delete('/restaurant/delete', isRestaurant, logout);

// Restaurant service ready  