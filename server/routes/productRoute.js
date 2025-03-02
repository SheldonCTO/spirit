import { Router } from 'express';
import ProductController from '../controllers/productController.js';
import ProductService from '../services/productService.js';
import pool from '../utils/db.js';

const router = Router();
const productService = new ProductService(pool);
const productController = new ProductController(productService);

router.get('/productList', productController.getProducts);
router.get('/:productId', productController.getProductById);
router.get('/store/:storeId', productController.getProductsByStoreId);
router.post('/create', productController.createProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

export default router;