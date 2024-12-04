import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import NewProduct from './newProduct';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sales(){
	const [sale, setSale] = useState([])
	const [products, setProducts] = useState([])

	useEffect(() => {
        // Fetch products from the API
        fetch('http://localhost:8080/api/sale')
            .then((res) => res.json())
            .then(setRecords)
            .catch((error) => console.error('Error fetching record:', error));
    }, []);

    useEffect(() => {
        // Fetch products from the API
        fetch('http://localhost:8080/api/sale/product')
            .then((res) => res.json())
            .then(setRecords)
            .catch((error) => console.error('Error fetching record:', error));
    }, []);
}