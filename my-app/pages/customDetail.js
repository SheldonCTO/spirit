import { readToken, authenticateUser, } from "@/lib/authenticate";
import { useState, useEffect } from 'react';
import OrderHistory from "./orderHistory.js"
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Link from 'next/link';

export default function csDate(){

	const [user, setUser] = useState(null);
  const [record, setRecord] = useState(null);

	let token = readToken();
	

	useEffect(() => {
        // Fetch products from the API
        fetch('http://localhost:8080/customer')
            .then((res) => res.json())
            .then(setUser)
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
      // Fetch products from the API
      fetch('http://localhost:8080/record')
          .then((res) => res.json())
          .then(setRecord)
          .catch((error) => console.error('Error fetching products:', error));
  }, []);


	return(
        <>
      
          <h2>Customer Profile</h2>
          <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >

        <Tab eventKey="profile" title="帳戶資料">
 {token && <>- Welcome: {token.userName}
        <br></br>
        {token.first_name} &nbsp; {token.last_name}
        <br></br> {token.email}
        <br></br>{token.phone}
        <br></br>{token.address}</>}
        </Tab>

        <Tab eventKey="orderRecord" title="訂單記錄">

        <br></br>
        <Form>
        {token.order_id} &nbsp; {token.order_date}
        
        <br></br> {token.email}
        <br></br>{token.phone}
        <br></br>{token.address}
        
        </Form>
        </Tab>

        <Tab eventKey="orderRecord" title="訂單記錄">
        <OrderHistory />
        </Tab>
      </Tabs>
    </>

    );
}