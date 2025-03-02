import { useAtom } from 'jotai';
import { cartListAtom } from '@/cartData';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { readToken } from "../lib/authenticate";
import { useRouter } from 'next/router';

export default function Cart() {
  const [cartList, setCartList] = useAtom(cartListAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [delivery_method, setDeliveryOption] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const router = useRouter();

  let token = readToken(false);

  // Calculate the total price
  const total = cartList.reduce((total, product) => total + (product.price * product.quantity), 0);

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    setIsLoading(true);
    try {
      // Create order data object
      const orderData = {
        address1,
        address2,
        town,
        city,
        productList: cartList.map(product => ({
          product_id: product.product_id,
          store_id: product.store_id,
          quantity: product.quantity,
          price: product.price
        })),
        total
      };

      // Send the order data to the backend
      const response = await fetch('/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order confirmed:', data);

        // Optionally clear the cart after successful order submission
        setCartList([]);
        alert('Order confirmed!');

        // Redirect to payment or order confirmation page
        router.push('/payment'); // Adjust to where you want to redirect after order
      } else {
        alert('Failed to confirm order. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ul>
        {cartList.map((product, index) => (
          <li key={index}>
            <strong>{product.product_name}</strong><br />
            <strong>Store:</strong> {product.store_name}<br />
            <strong>Description:</strong> {product.product_description}<br />
            <strong>Price:</strong> ${product.price.toFixed(2)}<br />
            <strong>Quantity:</strong> {product.quantity}<br />
            <strong>Total Price:</strong> ${(product.price * product.quantity).toFixed(2)}
            <br /><br />
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        <li><strong>Total: ${total.toFixed(2)}</strong></li>
      </ul>

      {/* Delivery or Store Pickup Option */}
      <Form>
        <Form.Check 
          type="radio"
          id="pickup-option"
          label="Store Pickup"
          name="deliveryOption"
          value="pickup"
          checked={delivery_method === 'pickup'}
          onChange={(e) => setDeliveryOption(e.target.value)}
        />
        <Form.Check 
          type="radio"
          id="delivery-option"
          label="Delivery"
          name="deliveryOption"
          value="delivery"
          checked={delivery_method === 'delivery'}
          onChange={(e) => setDeliveryOption(e.target.value)}
        />
        
        {delivery_method === 'delivery' && (
          <div>
            <Form.Group controlId="deliveryAddress">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="address1">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address Line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="address2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="town">
              <Form.Label>Town</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Town"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
          </div>
        )}
      </Form>

      {token ? (
        <Button
          onClick={handleConfirmOrder}
          variant="primary"
          disabled={isLoading || cartList.length === 0 || (delivery_method === 'delivery' && !address1 && !address2 && !town && !city)}
        >
          {isLoading ? 'Confirming Order...' : 'Confirm Order'}
        </Button>
      ) : (
        <Link href="/login" passHref legacyBehavior>
          <Button variant="link">Login</Button>
        </Link>
      )}
    </div>
  );
}
