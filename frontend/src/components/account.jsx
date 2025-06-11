import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAccount, fetchUserProfile } from '../slices/userSlice'
// import { getUserBookings } from "../redux/slices/bookingSlice";
// import { getUserSubscriptions } from "../redux/slices/subscriptionSlice";
import { toast } from "react-toastify";
import axios from "../axios/axios";

export default function AccountPage() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.bookings);
  const { subscriptions } = useSelector((state) => state.subscriptions);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getUserBookings());
    dispatch(getUserSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (formData.image) data.append("image", formData.image);

    try {
      const res = await dispatch(updateProfile(data)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div>
          <label className="block text-gray-600 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="border w-full p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="border w-full p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">New Password</label>
          <input
            type="password"
            name="password"
            className="border w-full p-2 rounded"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Profile Image</label>
          <input
            type="file"
            name="image"
            className="border w-full p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
        <div className="space-y-2">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-3 rounded bg-gray-100">
              <p>Car: {booking.car?.name}</p>
              <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">My Subscriptions</h2>
        <div className="space-y-2">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="border p-3 rounded bg-gray-100">
              <p>Plan: {sub.plan}</p>
              <p>Start: {new Date(sub.startDate).toLocaleDateString()}</p>
              <p>End: {new Date(sub.endDate).toLocaleDateString()}</p>
              <p>Status: {sub.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
