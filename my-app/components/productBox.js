import { useAtom } from "jotai";
import { cartListAtom } from "@/cartData";
import { useState, useEffect } from "react";

export default function ProductBox(props) {
  const { productId } = props; // Get product ID from props
  const [cartList, setCartList] = useAtom(cartListAtom);
  const [productData, setProductData] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch the product data including all stores, prices, and inventory details
  useEffect(() => {
    async function fetchProductDetails() {
      const response = await fetch(`/product/${productId}`);
      const data = await response.json();
      setProductData(data);
      // Set the default store selection if available
      if (data.stores && data.stores.length > 0) {
        setSelectedStore(data.stores[0].store_name); // Select the first store by default
      }
    }

    fetchProductDetails();
  }, [productId]);

  function addToCart() {
    if (selectedStore && quantity > 0) {
      const selectedStoreData = productData.stores.find(store => store.store_name === selectedStore);
      setCartList((prevCartList) => [
        ...prevCartList,
        {
          product_id: productData.id,
          product_name: productData.name,
          store_name: selectedStoreData.store_name,
          price: selectedStoreData.product_price,
          quantity: quantity,
          total_price: selectedStoreData.product_price * quantity,
        }
      ]);
    }
  }

  if (!productData) return null; // If product data isn't loaded, don't render anything

  return (
    <div>
      <img
        src={productData.product_image}
        alt={productData.name}
        style={{
          width: "150px",
          height: "auto",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      />
      <p>
        <strong>Title:</strong> {productData.name}
      </p>
      <p>
        <strong>Description:</strong> {productData.description}
      </p>
      <div>
        <strong>Available Stores:</strong>
        {productData.stores && productData.stores.length > 0 ? (
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            {productData.stores.map((store) => (
              <option key={store.store_name} value={store.store_name}>
                {store.store_name} - ${store.product_price} - Quantity: {store.product_quantity}
                <br />
                {store.location}
              </option>
            ))}
          </select>
        ) : (
          <p>No stores available for this product.</p>
        )}
      </div>
      <div>
        <strong>Quantity:</strong>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, e.target.value))}
          min="1"
          max={productData.stores.find(store => store.store_name === selectedStore)?.product_quantity || 0}
        />
        <button onClick={addToCart}>Add to Cart</button>
      </div>
      
    </div>
  );
}
