import pool from '../utils/db.js';
import { decodeJwt } from '../utils/jwt.js';

class OrderService {    
    constructor() {
        this.pool = pool;
    }

    async createOrder(req, data) {
        const { address1, address2, town, city, productList , total } = data;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = decodeJwt(token);
        const userId = decoded.id;

        try {
            const query1 = 'INSERT INTO orders (user_id, address1, address2, town, city, total) VALUES (?, ?, ?, ?, ?, ?)';
            const values1 = [userId, address1, address2, town, city, total];
            await this.pool.query(query1, values1);

            const [orderId] = await this.pool.query('SELECT LAST_INSERT_ID() as id');

            const query2 = 'INSERT INTO order_items (order_id, product_id, store_id, quantity, price) VALUES ?';
            const values2 = productList.map((product) => [orderId[0].id, product.product_id, product.store_id, product.quantity, product.price]);
            await this.pool.query(query2, [values2]);

            for (const product of productList) {
                const query3 = 'UPDATE inventories SET quantity = quantity - ? WHERE store_id = ? AND product_id = ?';
                const values3 = [product.quantity, product.store_id, product.product_id];
                await this.pool.query(query3, values3);
            }

            return { message: 'Order created successfully' };
        } catch (error) {
            throw new Error('Error creating order: ' + error.message);
        }
    }

    async getOrdersByUserID(req) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = decodeJwt(token);
        const userId = decoded.id;
        try {
            const [results] = await this.pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
            return results;
        } catch (error) {
            throw new Error('Error listing orders: ' + error.message);
        }
    }

    async getOrderById(req, orderId) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = decodeJwt(token);
        const userId = decoded.id;
        try {
            const [result] = await this.pool.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [orderId, userId]);

            if (result.length === 0) {
                throw new Error('Order not found');
            }
            const [productList] = await this.pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
            
            const order = {
                ...result[0],
                productList
            };

            return order;

        } catch (error) {
            throw new Error('Error getting order: ' + error.message);
        }
    }
}

export default OrderService;