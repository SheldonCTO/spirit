import { useAtom } from 'jotai';
import { cartListAtom } from '@/cartData';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { readToken, removeToken } from "../lib/authenticate";

export default function Cart() {
  const [cartList, setCartList] = useAtom(cartListAtom);
  const [isLoading, setIsLoading] = useState(false); // To manage loading state while confirming order
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // To track delivery/pickup selection
  const [deliveryAddress, setDeliveryAddress] = useState(''); // To track delivery address
  
  let token = readToken(false);


  // Handle order confirmation
  const handleConfirmOrder = async () => {
    setIsLoading(true); // Set loading state to true while sending the request
    try {
      const orderData = {
        cart: cartList,
        delivery_option: deliveryOption,
        delivery_address: deliveryOption === 'delivery' ? deliveryAddress : null,
      };

      // Send the order data to the backend
      const response = await fetch('/confirm-order', {
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
      } else {
        alert('Failed to confirm order. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
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
        <li><strong>Total: ${cartList.reduce((total, prod) => total + (prod.price * prod.quantity), 0).toFixed(2)}</strong></li>
      </ul>

      {/* Delivery or Store Pickup Option */}
      <Form>
        <Form.Check 
          type="radio"
          id="pickup-option"
          label="Store Pickup"
          name="deliveryOption"
          value="pickup"
          checked={deliveryOption === 'pickup'}
          onChange={(e) => setDeliveryOption(e.target.value)}
        />
        <Form.Check 
          type="radio"
          id="delivery-option"
          label="Delivery"
          name="deliveryOption"
          value="delivery"
          checked={deliveryOption === 'delivery'}
          onChange={(e) => setDeliveryOption(e.target.value)}
        />
        
        {deliveryOption === 'delivery' && (
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
          </div>
        )}
      </Form>

      {token?  <Button
        onClick={handleConfirmOrder}
        variant="primary"
        disabled={isLoading || cartList.length === 0 || (deliveryOption === 'delivery' && !deliveryAddress)}
      >
        {isLoading ? 'Confirming Order...' : 'Confirm Order'}
      </Button> :
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link>Login</Nav.Link>
              </Link>
           }
     
    </div>
  );
}
