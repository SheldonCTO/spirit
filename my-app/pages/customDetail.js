import { readToken, authenticateUser, } from "@/lib/authenticate";
import { useState, useEffect } from 'react';
import { Container, Row, Col,Navbar, Nav, Form } from "react-bootstrap";

import Link from 'next/link';

export default function csDate(){

	const [user, setUser] = useState(null);
	let token = readToken();
	

	useEffect(() => {
        // Fetch products from the API
        fetch('http://localhost:8080/api/cs')
            .then((res) => res.json())
            .then(setProducts)
            .catch((error) => console.error('Error fetching products:', error));
    }, []);


	return(
        <>
        <Card bg="light">
        <Card.Body>
          <h2>Customer Profile</h2>
        </Card.Body>
      </Card>
      <Form>
        {token && <>- Welcome: {token.userName}
        <br></br>
        {token.fullName}
        <br></br> {token.orderID}
        <br></br>{token.phone}
        <br></br>{token.address}</>}
      </Form></>
    );
}