import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

import Link from "next/link";

export default function Home() {

  const [newProduct, setNewProd] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products`)
      .then((res) => res.json())
      .then(setNewProd)
        
      .catch((error) => 
        console.log("Error when fetching products: ", error));
      
  }, []);
  const handleRowClick = (product) => {
    setSelectedProduct(product);
};

const handleCloseModal = () => {
  setSelectedProduct(null);
};

  return (
    <body>
      <>
     
      <main className={`${styles.main}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
    
        <h2 >最新產品</h2>
        <div style={{display:'flex'}}>
                    {newProduct.map((product) => (
                        <a key={product.id} onClick={() => handleRowClick(product)} >
                            <img src={product.url} alt={product.title} style={{ width: '100px', height: 'auto'}} />
                            <p style={{width:"200px"}}>{product.distrillary}</p>
                            <p style={{width:"200px"}}>{product.Title}</p>
                           
                            
                            
                        </a>
                    ))}
                   
                {selectedProduct && (
                <Modal onClose={handleCloseModal}>
                    <ProductBox product={selectedProduct} />
                </Modal>
            )} </div>
       
      </div>
         
      </main>

    </></body>
  );
}
