import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Image } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

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
    
    <Carousel>
      <Carousel.Item>
        <Image src="/headCopy.gif" alt="Logo" width={150} height="auto"priority/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
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
