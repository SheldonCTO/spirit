import { useAtom } from "jotai";
import { cartListAtom } from "@/cartData";
import Link from "next/link";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { readToken, removeToken } from "../lib/authenticate";
import Image from "next/image";
import Navigation from "./navigation";
import { useEffect, useState } from "react"; // Import useState and useEffect

export default function Layout(props) {
  const [cartList, setCartList] = useAtom(cartListAtom);
  const [token, setToken] = useState(null);  // State to store token
  const router = useRouter();

  // Use useEffect to load the token only on the client
  useEffect(() => {
    const tokenData = readToken(false);  // Only run on the client
    setToken(tokenData);  // Set the token state after fetching it
  }, []);  // This runs once when the component mounts on the client

  function logout() {
    removeToken();
    setCartList([]);
    router.push("/");
  }

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        style={{
          position: "fixed",
          top: 0,
          left: 20,
          right: 20,
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Nav className="ml-auto">
          <div className="logo">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={30}
              priority
            />
          </div>
        </Nav>

        <Nav>
          {/* If not logged in, show login link */}
          {!token && (
            <Link href="/login" passHref legacyBehavior>
              <Nav.Link>
                <Image
                  src="/login.png"
                  alt="login"
                  width={30}
                  height={30}
                  priority
                />
              </Nav.Link>
            </Link>
          )}
          {/* If logged in, show welcome message and logout link */}
          {token && (
            <Link href="/customerDetail" passHref legacyBehavior>
              <Nav.Link>Welcome: {token.userName}</Nav.Link>
            </Link>
          )}

          {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
        </Nav>
      </Navbar>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <br /> <br /> <br />
        <Navigation></Navigation>
        <br />
        <Container>
          <Row>
            <Col>{props.children}</Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
