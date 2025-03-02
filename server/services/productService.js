import pool from '../utils/db.js';

class ProductService {
    constructor() {
        this.pool = pool;
    }

    async getProducts() {
        try {
            const [results] = await this.pool.query('SELECT * FROM products');
            return results;
        } catch (error) {
            throw new Error('Error listing products: ' + error.message);
        }
    }

    async getProductById(productId) {
        try {
            const [result] = await this.pool.query('SELECT * FROM products WHERE id = ?', [productId]);

            if (result.length === 0) {
                throw new Error('Product not found');
            }
            return result[0];
        } catch (error) {
            throw new Error('Error getting product: ' + error.message);
        }
    }

    async getProductsByStoreId(storeId) {
        try {
            const [results] = await this.pool.query('SELECT * FROM products WHERE store_id = ?', [storeId]);
            return results;
        } catch (error) {
            throw new Error('Error listing products: ' + error.message);
        }
    }

    async createProduct(data) {
        const { name, description, price, store_id } = data;
        try {
            const query = 'INSERT INTO products (name, description, price, store_id) VALUES (?, ?, ?, ?)';
            const values = [name, description, price, store_id];
            await this.pool.query(query, values);
            return { message: 'Product created successfully' };
        } catch (error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }

    async updateProduct(productId, data) {
        const { name, description, price } = data;
        try {
            const query = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
            const values = [name, description, price, productId];
            await this.pool.query(query, values);
            return { message: 'Product updated successfully' };
        } catch (error) {
            throw new Error('Error updating product: ' + error.message);
        }
    }

    async deleteProduct(productId) {
        try {
            await this.pool.query('DELETE FROM products WHERE id = ?', [productId]);
            return { message: 'Product deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting product: ' + error.message);
        }
    }
}

export default ProductService;