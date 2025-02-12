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
    fetch("http://localhost:8080/products")
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
  f
  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="whisky" title="威士忌">
          {products
            .filter((product) => product.category === "whisky") // for the whisky tab
            .map((product) => (
              <Card style={{ width: "18rem" }}>
                <a key={product.id} onClick={() => handleRowClick(product)}>
                  <Card.Img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100px", height: "auto" }}
                  />
                  <Card.Body>
                  <Card.Title style={{ width: "200px" }}>
                    {product.Title}
                  </Card.Title>
                  <Card.Text>
                    <p style={{ width: "70px" }}>{product.distrillery}</p>
                    <p style={{ width: "70px" }}>{product.capacity}</p>
                    <p style={{ width: "70px" }}>{product.alc}%</p>
                  </Card.Text>
                  
                  </Card.Body>
                </a>
              </Card>
            ))}
        </Tab>

        <Tab eventKey="brandy" title="白蘭地">
          {products
            .filter((product) => product.category === "brandy") // for the whisky tab
            .map((product) => (
              <Card style={{ width: "18rem" }}>
              <a key={product.id} onClick={() => handleRowClick(product)}>
                <Card.Img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100px", height: "auto" }}
                />
                <Card.Body>
                <Card.Title style={{ width: "200px" }}>
                  {product.Title}
                </Card.Title>
                <Card.Text>
                  <p style={{ width: "70px" }}>{product.distrillery}</p>
                  <p style={{ width: "70px" }}>{product.capacity}</p>
                  <p style={{ width: "70px" }}>{product.alc}%</p>
                </Card.Text>
                
                </Card.Body>
              </a>
            </Card>
            ))}
        </Tab>
        <Tab eventKey="beer" title="啤酒">
          {products
            .filter((product) => product.category === "beer") // for the whisky tab
            .map((product) => (
              <Card style={{ width: "18rem" }}>
              <a key={product.id} onClick={() => handleRowClick(product)}>
                <Card.Img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100px", height: "auto" }}
                />
                <Card.Body>
                <Card.Title style={{ width: "200px" }}>
                  {product.Title}
                </Card.Title>
                <Card.Text>
                  <p style={{ width: "70px" }}>{product.distrillery}</p>
                  <p style={{ width: "70px" }}>{product.capacity}</p>
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
