import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
export const router = Router();
import {login,getOrdersByStatus} from "../controller/admin.controller.js"

// Shahruz

// router.get('/admin', isAdmin, getNotifications); // send restaurants and couriers by isActive: false
// router.get('/admin/order', isAdmin, getOrders);
// router.get('/admin/order/:orderId', isAdmin, getOneOrder);

router.post('/admin/login', login);
// router.post('/admin/order/date', isAdmin, getOrdersByDate);
router.post('/admin/order/status', isAdmin, getOrdersByStatus);
// router.post('/admin/restaurant/status', isAdmin, getRestaurantsByStatus);

// router.put('/admin/restaurant/:restaurantId', isAdmin, changeIsActiveRes);
// router.put('/admin/courier/:courierId', isAdmin, changeIsActiveCourier);

// router.delete('/admin/logout', isAdmin, logout);
// router.delete('/admin/restaurant/:restaurantId', isAdmin, deleteRestaurant);
// router.delete('/admin/courier/:courierId', isAdmin, deleteCourier);

