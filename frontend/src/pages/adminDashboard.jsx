import React from "react";
const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Cars: 42</div>
        <div className="bg-white p-4 rounded shadow">Total Users: 120</div>
        <div className="bg-white p-4 rounded shadow">Total Bookings: 305</div>
        <div className="bg-white p-4 rounded shadow">Active Subscriptions: 80</div>
      </div>
    </div>
  );
};

export default AdminDashboard;