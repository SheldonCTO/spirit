import { useEffect, useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  // Fetch order history when component mounts
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/order-history");
        const data = await res.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    }
    fetchOrders();
  }, []);

  // Function to download receipt as PDF
  const downloadReceipt = async (order) => {
    const receiptElement = document.getElementById(`order-${order.id}`);
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-${order.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  return (
    <div>
      <h2>Order History</h2>
      {orders.map(order => (
        <Card key={order.id} className="mb-3">
          <Card.Header>
            Order ID: {order.id} | Date: {order.orderDate}
          </Card.Header>
          <Card.Body id={`order-${order.id}`}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Sub Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((prod, idx) => (
                  <tr key={idx}>
                    <td>{prod.name}</td>
                    <td>{prod.quantity}</td>
                    <td>${prod.subAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Delivery Method:</strong> {order.deliveryMethod}</p>
            <Button variant="primary" onClick={() => downloadReceipt(order)}>
              Download Receipt
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
