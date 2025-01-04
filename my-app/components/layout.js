import { useAtom } from 'jotai';
import { cartListAtom } from '@/cartData';
import Link from "next/link";
import { Container, Row, Col,Navbar, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { readToken, removeToken } from "../lib/authenticate"
import { Container, Navbar, Nav } from "react-bootstrap";
import Image from "next/image";
import Navigation from "./navigation";

export default function Layout(props) {
	const [cartList, setCartList] = useAtom(cartListAtom);
	const router = useRouter();
	let token = readToken();
	
  
	function logout() {
	  removeToken();
	  setCartList([]);
	  router.push("/");
	}

  return (
	<>
 <Navbar bg="light" expand="lg" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      
	  <div class="col-lg-max" style={{whitespace:'nowrap', backgroundColor:'#d3736d', display:'flex', justifyContent:'space-between'}}>
		
		
			<p class="card-title" style={{whitespace:'nowrap', backgroundColor:'#d3736d'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alcohol Express---2 hours Deliver Promise</p>
			<Nav className="ml-auto">
          {token && <Link href="/cart" passHref legacyBehavior><Nav.Link>Shopping Cart <span>({cartList.length})</span></Nav.Link></Link>}
            {!token && <Link href="/login" passHref legacyBehavior><Nav.Link>Login</Nav.Link></Link>}
            {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            
          </Nav>
		
	 

	</div>
  </Navbar>
  <div
	style={{
	  display: "flex",
	  flexDirection: "column",
	  alignItems: "center",
	}}
  >
	<br></br>
	<div className="logo">
	<Image
      src="/logo.png"
      alt="Logo"
      className={styles.vercelLogo}
      width={150}
      height="auto"
      priority
    />
	</div>
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
	

	
