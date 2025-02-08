import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import ProductBox from '../components/productBox';
import { readToken } from "@/lib/authenticate";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export default function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
   

    useEffect(() => {
        // Fetch products from the API
        fetch('http://localhost:8080/api/products')
            .then((res) => res.json())
            .then(setProducts)
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Function to handle clicking on a product row
    const handleRowClick = (product) => {
        setSelectedProduct(product);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

   



    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{width:"200px"}}>Title</th>
                        <th scope="col"style={{width:"70px"}}>Price</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <a key={product.id} onClick={() => handleRowClick(product)}>
                            <img src={product.image} alt={product.title} style={{ width: '100px', height: 'auto' }} />
                            <p style={{width:"200px"}}>{product.Title}</p>
                            <p style={{width:"70px"}}>{product.distrillery}</p>
                            <p style={{width:"70px"}}>{product.capacity}</p>
                            <p style={{width:"70px"}}>{product.alc}%</p>
                            
                        </a>
                    ))}
                </tbody>
            </table>
            {selectedProduct && (
                <Modal onClose={handleCloseModal}>
                    <ProductBox product={selectedProduct} />
                </Modal>
            )}
            {/* {showLoginSuccessModal && (
                <Modal id="Login-Success" show={showLoginSuccessModal} onClose={handleLoginClose}>
                    <div>Login Success!</div>
                </Modal>
            )} */}
        </div>
    );
}