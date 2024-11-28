import { readToken, authenticateUser, } from "@/lib/authenticate";
import { useState, useEffect } from 'react';

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

	);
}