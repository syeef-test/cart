import React, { useEffect, useState, useRef } from "react";
import appwriteService from "../appwrite/appwriteService";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const statusRef = useRef();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await appwriteService.getOrders();
      console.log(response);
      setOrders(response.documents);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrder = async (orderId, updatedOrder) => {
    try {
      const response = await appwriteService.updateOrder(orderId, updatedOrder);
      if (response) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      status: statusRef.current.value,
    };

    updateOrder(currentOrder.$id, order);

    statusRef.current.value = "";

    setIsEditing(false);
    setCurrentOrder(null);
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentOrder(category);
    statusRef.current.value = category.status;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div>
          <label>Status:</label>
          <br />
          <input type="text" ref={statusRef} required />
        </div>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="submit"
        >
          Update
        </button>
      </form>
      <div>
        {orders.map((order) => (
          <div key={order.$id}>
            <h3>Price:{order.total_price}</h3>
            <p>Order Status:{order.status}</p>
            <h4 className="text-lg font-semibold mb-2">Products:</h4>
            {/* <ul className="list-disc list-inside mb-4">
              {order.products.map((product, index) => (
                <li key={index}>
                  <p>Name: {product.name}</p>
                </li>
              ))}
            </ul> */}
            <button
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handleEdit(order)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderManagement;
