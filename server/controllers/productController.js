class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    
    getProducts = async (req, res) => {
        const products = await this.productService.getProducts();
        res.json(products);
    }
    
    getProductById = async (req, res) => {
        const productId = req.params.productId;
        const product = await this.productService.getProductById(productId);
        res.json(product);
    }
    
    getProductsByStoreId = async (req, res) => {
        const storeId = req.params.storeId;
        const products = await this.productService.getProductsByStoreId(storeId);
        res.json(products);
    }
    
    createProduct = async (req, res) => {
        const product = req.body;
        const newProduct = await this.productService.createProduct(product);
        res.json(newProduct);
    }
    
    updateProduct = async (req, res) => {
        const productId = req.params.productId;
        const product = req.body;
        const updatedProduct = await this.productService.updateProduct(productId, product);
        res.json(updatedProduct);
    }
    
    deleteProduct = async (req, res) => {
        const productId = req.params.productId;
        await this.productService.deleteProduct(productId);
        res.json({ message: 'Product deleted' });
    }
}

export default ProductController;