import { useEffect, useState } from "react";
import Modal from "../components/modal";
import ProductBox from "../components/productBox";
import { readToken } from "@/lib/authenticate";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import { useRouter } from "next/router";



export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    // Fetch products from the API
    fetch("http://localhost:8080/product/productList")
      .then((res) => res.json())
      .then(setProducts)
      .catch((error) => console.error("Error fetching products:", error));
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
    <>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
       <Tab eventKey="" title="所有產品">
  {products.map((product) => (
    <Card style={{ width: "18rem" }} key={product.id}>
      <a onClick={() => handleRowClick(product)}>
        <Card.Img
          src={product.image}
          alt={product.name}
          style={{ width: "100px", height: "auto" }}
        />
        <Card.Body>
          <Card.Title style={{ width: "200px" }}>
            {product.name}
          </Card.Title>
          <Card.Text>
            <p style={{ width: "70px" }}>{product.distillery}</p>
            <p style={{ width: "70px" }}>{product.ml}</p>
            <p style={{ width: "70px" }}>{product.alc}%</p>
          </Card.Text>
        </Card.Body>
      </a>
    </Card>
  ))}
</Tab>

        <Tab eventKey="Whisky" title="威士忌">
          {products
            .filter((product) => product.category === "Whisky") // for the whisky tab
            .map((product) => (
              <Card style={{ width: "18rem" }}>
                <a key={product.id} onClick={() => handleRowClick(product)}>
                  <Card.Img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                  <Card.Body>
                  <Card.Title style={{ width: "200px" }}>
                    {product.name}
                  </Card.Title>
                  <Card.Text>
                    <p style={{ width: "70px" }}>{product.distillery}</p>
                    <p style={{ width: "70px" }}>{product.ml}</p>
                    <p style={{ width: "70px" }}>{product.alc}%</p>
                  </Card.Text>
                  
                  </Card.Body>
                </a>
              </Card>
            ))}
        </Tab>

        <Tab eventKey="Brandy" title="白蘭地">
          {products
            .filter((product) => product.category === "Brandy") // for the whisky tab
            .map((product) => (
              <Card style={{ width: "18rem" }}>
              <a key={product.id} onClick={() => handleRowClick(product)}>
                <Card.Img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100px", height: "auto" }}
                />
                <Card.Body>
                <Card.Title style={{ width: "200px" }}>
                    {product.name}
                  </Card.Title>
                  <Card.Text>
                    <p style={{ width: "70px" }}>{product.distillery}</p>
                    <p style={{ width: "70px" }}>{product.ml}</p>
                    <p style={{ width: "70px" }}>{product.alc}%</p>
                  </Card.Text>
                  
                
                </Card.Body>
              </a>
            </Card>
            ))}
        </Tab>
        <Tab eventKey="Sake" title="清酒">
          {products
            .filter((product) => product.category === "Sake") // for the whisky tab
            .map((product) => (
              <Card style={{ width: "18rem" }}>
              <a key={product.id} onClick={() => handleRowClick(product)}>
                <Card.Img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100px", height: "auto" }}
                />
                <Card.Body>
                <Card.Title style={{ width: "200px" }}>
                  {product.Title}
                </Card.Title>
                <Card.Text>
                  <p style={{ width: "70px" }}>{product.distillery}</p>
                  <p style={{ width: "70px" }}>{product.ml}</p>
                  <p style={{ width: "70px" }}>{product.alc}%</p>
                </Card.Text>

                </Card.Body>
              </a>
            </Card>
            ))}
        </Tab>
      </Tabs>
      {selectedProduct && (
        <Modal onClose={handleCloseModal}>
          <ProductBox product={selectedProduct} />
        </Modal>
      )}
    </>
  );
}
