import { useAtom } from "jotai";
import { cartListAtom } from "@/cartData";
import { useState } from "react";
import { Button } from "react-bootstrap/Button";

export default function Cart() {
  const [cartList, setCartList] = useAtom(cartListAtom);
  const [isLoading, setIsLoading] = useState(false); // To manage loading state while confirming order

  // Function to handle order confirmation
  const handleConfirmOrder = async () => {
    setIsLoading(true); // Set loading state to true while sending the request
    try {
      // Send cart data to the backend
      const response = await fetch("/api/confirm-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartList,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order confirmed:", data);

        // Optionally clear the cart after successful order submission
        setCartList([]);
        alert("Order confirmed!");
      } else {
        alert("Failed to confirm order. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Update quantity function
  const handleQuantityChange = (productId, newQuantity) => {
    setCartList((prevCartList) =>
      prevCartList.map((product) =>
        product.product_id === productId
          ? {
              ...product,
              quantity: newQuantity,
              total_price: newQuantity * product.price,
            }
          : product
      )
    );
  };

  return (
    <div>
      <ul>
        {cartList.map((product, index) => (
          <li key={index}>
            <strong>{product.product_name}</strong>
            <br />
            <strong>Store:</strong> {product.store_name}
            <br />
            <strong>Description:</strong> {product.product_description}
            <br />
            <strong>Price:</strong> ${product.price.toFixed(2)}
            <br />
            <strong>Quantity:</strong>
            <input
              type="number"
              value={product.quantity}
              min="1"
              max={product.product_quantity}
              onChange={(e) =>
                handleQuantityChange(product.product_id, Number(e.target.value))
              }
            />
            <br />
            <strong>Total Price:</strong> $
            {(product.total_price || product.price * product.quantity).toFixed(
              2
            )}
            <br />
            <br />
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        <li>
          <strong>
            Total: $
            {cartList
              .reduce(
                (total, prod) =>
                  total + (prod.total_price || prod.price * prod.quantity),
                0
              )
              .toFixed(2)}
          </strong>
        </li>
      </ul>
      <Button
        variant="primary"
        onClick={handleConfirmOrder}
        disabled={isLoading || cartList.length === 0} // Disable button if cart is empty or if request is ongoing
      >
        {isLoading ? "Confirming Order..." : "Confirm Order"}
      </Button>
    </div>
  );
}
