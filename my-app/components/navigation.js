import { Container, Navbar, Nav } from "react-bootstrap";
import Link from "next/link";

export default function Navigation(props) {
  return (
    <Navbar expand="lg">
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>主頁&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>
            <Link href="/sales" passHref legacyBehavior>
              <Nav.Link>購買產品&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>

            <Link href="/payment" passHref legacyBehavior>
              <Nav.Link>付款方式&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>
            <Link href="/location" passHref legacyBehavior>
              <Nav.Link>合作店戶&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <Nav.Link>聯絡我們&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link>
            </Link>

            <form
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="搜尋..."
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <button
                type="submit"
                style={{
                  marginLeft: "5px",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                搜尋
              </button>
            </form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
