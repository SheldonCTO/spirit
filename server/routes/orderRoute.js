import { Router } from 'express';
import OrderController from '../controllers/orderController.js';
import OrderService from '../services/orderService.js';
import pool from '../utils/db.js';

const router = Router();
const orderService = new OrderService(pool);
const orderController = new OrderController(orderService);

router.post('/create', orderController.createOrder);
router.get('/history', orderController.getOrdersByUserID);
router.get('/:orderId', orderController.getOrderById);

export default router;