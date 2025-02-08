<?php
// Database connection variables
$host   = 'localhost';
$user   = 'your_username';
$pass   = 'your_password';
$dbname = 'alcohol_express'; // or your database name

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// --- Create the 'product' table ---
$sql_product = "CREATE TABLE IF NOT EXISTS product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
	image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if ($conn->query($sql_product) === TRUE) {
    echo "Product table created successfully.<br>";
} else {
    echo "Error creating product table: " . $conn->error . "<br>";
}

// --- Create the 'customer' table ---
$sql_customer = "CREATE TABLE IF NOT EXISTS customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if ($conn->query($sql_customer) === TRUE) {
    echo "Customer table created successfully.<br>";
} else {
    echo "Error creating customer table: " . $conn->error . "<br>";
}

// --- Create the 'orders' table ---
$sql_orders = "CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    -- Make sure the 'customer' table exists before adding a foreign key
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
)";
if ($conn->query($sql_orders) === TRUE) {
    echo "Orders table created successfully.<br>";
} else {
    echo "Error creating orders table: " . $conn->error . "<br>";
}

// --- Create the 'store' table ---
$sql_store = "CREATE TABLE IF NOT EXISTS store (
    store_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
    location VARCHAR(255),
	FOREIGN KEY (product_id) REFERENCES product(product_id)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if ($conn->query($sql_store) === TRUE) {
    echo "Store table created successfully.<br>";
} else {
    echo "Error creating store table: " . $conn->error . "<br>";
}

// --- Create the 'inventory' table ---
$sql_inventory = "CREATE TABLE IF NOT EXISTS inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    store_id INT,
    quantity INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (store_id) REFERENCES store(store_id)
)";
if ($conn->query($sql_inventory) === TRUE) {
    echo "Inventory table created successfully.<br>";
} else {
    echo "Error creating inventory table: " . $conn->error . "<br>";
}

// Close the connection
$conn->close();
?>
