import { Router } from "express";
import { isCourier } from "../middlewares/isCourier.js";
import { changeCourierStatus, changePassword, editProfile, getOrder, getOrdersByStatus, getProfile, login, logout, register } from "../controller/courier.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
export const router = Router();


// Rakhmatov07
router.post('/courier/register', register);
router.post('/courier/login', login);
router.delete('/courier/logout',isCourier , logout);

router.put('/courier/profile', isCourier, editProfile);
router.put('/courier/password', isCourier, changePassword);
router.put('/courier/status', isAdmin, changeCourierStatus);

router.get('/courier/profile', isCourier, getProfile);
router.get('/courier/order', isCourier, getOrdersByStatus); // get all accepted status orders and onDuty status orders of courier
router.get('/courier/:orderId', isCourier, getOrder);

