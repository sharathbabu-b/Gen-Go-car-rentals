// src/pages/SubscriptionPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubscriptions,
  createSubscription,
  deleteSubscription,
  updateSubscription,
} from "../slices/subscriptionSlice"

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const { subscriptions, loading, error } = useSelector(state => state.subscriptions);

  const [formData, setFormData] = useState({
    userId: '',
    UpgradePlan: 'Basic',
    price: '',
    start_date: '',
    end_date: '',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubscription(formData));
  };

  const handleDelete = (id) => {
    dispatch(deleteSubscription(id));
  };

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Subscriptions</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <select name="UpgradePlan" value={formData.UpgradePlan} onChange={handleChange} className="border p-2 w-full">
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Platinum">Platinum</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
          Active
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
      </form>

      {loading ? (
        <p>Loading subscriptions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th>User</th>
              <th>Plan</th>
              <th>Price</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(sub => (
              <tr key={sub._id}>
                <td>{sub.userId?.name || sub.userId}</td>
                <td>{sub.UpgradePlan}</td>
                <td>${sub.price}</td>
                <td>{new Date(sub.start_date).toLocaleDateString()}</td>
                <td>{sub.end_date ? new Date(sub.end_date).toLocaleDateString() : 'N/A'}</td>
                <td>{sub.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(sub._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubscriptionPage;
