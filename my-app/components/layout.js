import { useAtom } from "jotai";
import { cartListAtom } from "@/cartData";
import Link from "next/link";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { readToken, removeToken } from "../lib/authenticate";
import Image from "next/image";
import Navigation from "./navigation";

export default function Layout(props) {
  const [cartList, setCartList] = useAtom(cartListAtom);
  const router = useRouter();
  let token = readToken(false);

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
        {/* {token && (
              <Link href="./cart" passHref legacyBehavior>
                <Nav.Link>
                  Shopping Cart <span>({cartList.length})</span>
                </Nav.Link>
              </Link>
            )} */}
        <Nav>
          {!token && (
            <Link href="/login" passHref legacyBehavior>
              <Nav.Image
                src="/login.png"
                alt="login"
                width={30}
                height={30}
                priority
              />
            </Link>
          )}
          {token && (
            <Link href="/customerDetail" passHref legacyBehavior>
              <>Welcome: {token.userName}</>
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
