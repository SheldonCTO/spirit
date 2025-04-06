import { useAtom } from "jotai";
import { cartListAtom } from "@/cartData";
import { useState, useEffect } from "react";

export default function ProductBox(props) {
  const { productId } = props;
  const [cartList, setCartList] = useAtom(cartListAtom);
  const [productData, setProductData] = useState(null);
  const [storeData, setStoreData] = useState([]);
  const [inventoryData, setInventoryData] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchAllData() {
      try {
        // Fetch product data first to get inventoryId
        const productRes = await fetch(`/product/${productId}`);
        const product = await productRes.json();
        setProductData(product);

        // Extract inventoryId from product data
        const inventoryId = product.inventory_id;

        // Fetch store and inventory data in parallel
        const [storeRes, inventoryRes] = await Promise.all([
          fetch(`/store/${storeId}`),
          fetch(`/inventory/${inventoryId}`),
        ]);

        const stores = await storeRes.json();
        const inventory = await inventoryRes.json();

        setStoreData(stores);
        setInventoryData(inventory);

        // Default store selection (based on product.stores, if it still exists)
        if (product.stores && product.stores.length > 0) {
          setSelectedStore(product.stores[0].store_name);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAllData();
  }, [productId]);

  function addToCart() {
    if (selectedStore && quantity > 0 && productData) {
      const selectedStoreData = productData.stores.find(
        (store) => store.store_name === selectedStore
      );
      setCartList((prevCartList) => [
        ...prevCartList,
        {
          product_id: productData.id,
          product_name: productData.name,
          store_name: selectedStoreData.store_name,
          price: selectedStoreData.product_price,
          quantity: quantity,
          total_price: selectedStoreData.product_price * quantity,
        },
      ]);
    }
  }

  if (!productData || !storeData || !inventoryData) return <p>Loading...</p>;

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
          max={
            productData.stores.find(
              (store) => store.store_name === selectedStore
            )?.product_quantity || 0
          }
        />
        <button onClick={addToCart}>Add to Cart</button>
      </div>

      <div>
        <strong>Inventory Info:</strong>
        <pre>{JSON.stringify(inventoryData, null, 2)}</pre>
      </div>

      <div>
        <strong>Store Info:</strong>
        <pre>{JSON.stringify(storeData, null, 2)}</pre>
      </div>
    </div>
  );
}
