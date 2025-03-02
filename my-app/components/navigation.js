import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";

export default function Navigation(props) {
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search input
  const [distilleryData, setDistilleryData] = useState(null); // State to hold the distillery data from backend

  // Handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (searchTerm) {
      console.log(`Searching for distillery: ${searchTerm}`);
      
      // Fetch distillery data from the backend based on the entered searchTerm
      try {
        const response = await fetch(`http://localhost:8080 /products/distrillery/${searchTerm}`);
        const data = await response.json();

        if (response.ok) {
          setDistilleryData(data); // Save the data from backend to the state
          console.log("Fetched data:", data);
        } else {
          alert("No data found for this distillery.");
        }
      } catch (error) {
        console.error("Error fetching distillery data:", error);
        alert("An error occurred while fetching data.");
      }
    } else {
      alert("Please enter a distillery.");
    }
  };

  return (
    <Navbar expand="lg">
      <Container
        style={{
          display: "flex",
          justifyContent: "space-around",
          color: "white",
        }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link style={{ color: "white" }}>主頁&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>
            <Link href="/products" passHref legacyBehavior>
              <Nav.Link style={{ color: "white" }}>購買產品&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>

            <Link href="/payment" passHref legacyBehavior>
              <Nav.Link style={{ color: "white" }}>付款方式&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>
            <Link href="/location" passHref legacyBehavior>
              <Nav.Link style={{ color: "white" }}>合作店戶&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <Nav.Link style={{ color: "white" }}>聯絡我們&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>

            <form
              onSubmit={handleSearch} // Handle the form submission
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Search Input with placeholder */}
              <input
                type="text"
                placeholder="Please enter distillery"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term as the user types
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />

              {/* Search Button */}
              <Button
                type="submit"
                variant="primary"
                style={{
                  marginLeft: "5px",
                }}
              >
                搜尋
              </Button>
            </form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
