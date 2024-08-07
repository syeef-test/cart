import React from "react";
import CategoryManagement from "./CategoryManagement";
import OrderManagement from "./OrderManagement";
import ProductManagement from "./ProductManagement";
function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <CategoryManagement />
      {/* <OrderManagement />
      <ProductManagement /> */}
    </div>
  );
}

export default Dashboard;
