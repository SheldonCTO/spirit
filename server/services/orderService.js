import pool from '../utils/db.js';
import { decodeJwt } from '../utils/jwt.js';

class OrderService {    
    constructor() {
        this.pool = pool;
    }

    async createOrder(data) {
        const { userId, address1, address2, town, city, productList } = data;

        try {
            const query1 = 'INSERT INTO orders (user_id, address1, address2, town, city) VALUES (?, ?, ?, ?, ?)';
            const values1 = [userId, address1, address2, town, city];
            await this.pool.query(query1, values1);

            const [orderId] = await this.pool.query('SELECT LAST_INSERT_ID() as id');

            const query2 = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
            const values2 = productList.map((product) => [orderId[0].id, product.id, product.quantity, product.price]);
            await this.pool.query(query2, [values2]);

            const query3 = 'UPDATE inventories SET quantity = quantity - ? WHERE store_id = ? AND product_id = ?';
            const values3 = productList.map((product) => [product.quantity, userId, product.id]);
            await this.pool.query(query3, values3);

            const query4 = 'UPDATE orders SET total = (SELECT SUM(price) FROM order_items WHERE order_id = ?) WHERE id = ?';
            await this.pool.query(query4, [orderId[0].id, orderId[0].id]);

            return { message: 'Order created successfully' };
        } catch (error) {
            throw new Error('Error creating order: ' + error.message);
        }
    }

    async getOrdersByUserID() {
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

    async getOrderById(orderId) {
        try {
            const [order] = await this.pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);
            const [productList] = await this.pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
            if (order.length === 0) {
                throw new Error('Order not found');
            }
            
            order[0].productList = productList;

            return order[0];
        } catch (error) {
            throw new Error('Error getting order: ' + error.message);
        }
    }
}

export default OrderService;