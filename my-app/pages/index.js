import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import Link from "next/link";

export default function Home() {
  const [newProduct, setNewProd] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products`)
      .then((res) => res.json())
      .then(setNewProd)

      .catch((error) => console.log("Error when fetching products: ", error));
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
                <Image
                  src="/head.jpg"
                  alt="banner"
                  width={500}
                  height={300} // Provide some numeric values as a fallback
             style={{ height: "auto", width: "500px" }}
                  priority
                />
               
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src="/idea.jpg"
                  alt="banner"
                  width={500}
                  height={300} // Provide some numeric values as a fallback
                  style={{ height: "auto", width: "500px" }}
                  priority
                />
               
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src="/party.jpg"
                  alt="banner"
                  width={500}
                  height={300}// Provide some numeric values as a fallback
                  style={{ height: "auto", width: "500px" }}
                  priority
                />
                <Carousel.Caption>
                  <h3>Event Delivery</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <br />
            <Button href="./product">馬上訂購</Button>
            <br /><br />
            <div className="mainProductCard"
            style={{display:"flex"}}>
              <div className="newProduct">
              <Card style={{ width: '25rem' }}>
      <Card.Img variant="top" src="/dalmore50.jpg" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Distrillary: Dalmore

        </Card.Text>
        <Button variant="primary">加入購物籃</Button>
      </Card.Body>
    </Card>
              </div>&nbsp;
              <div className="allProduct"
               style={{display:"flex", weight:"40px"}}>
              <Card style={{ width: '10rem', height:'15rem' }}>
      <Card.Img variant="top" src="/baijiu.jpeg" />
      <Card.Body>
       
        <Button variant="primary">加入購物籃</Button>
      </Card.Body>
    </Card>
    &nbsp;
    <Card style={{ width: '10rem', height:'15rem' }}>
      <Card.Img variant="top" src="/beer.jpeg" />
      <Card.Body>
       
        <Button variant="primary">加入購物籃</Button>
      </Card.Body>
    </Card>
    &nbsp;
    <Card style={{ width: '10rem', height:'15rem' }}>
      <Card.Img variant="top" src="/gin.jpeg" />
      <Card.Body>
       
        <Button variant="primary">加入購物籃</Button>
      </Card.Body>
    </Card>
              </div>
            </div>
            {/* <div style={{display:'flex'}}>
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
            )} </div> */}
          </div>
        </main>
      </>
    </body>
  );
}
