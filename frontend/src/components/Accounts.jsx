import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAccount, fetchUserAccount } from "../slices/userSlice";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";

export default function AccountPage() {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    role: "",
    address: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(fetchUserAccount());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "",
        address: userData.address || "",
      }));
      setPreviewImage(userData.image);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("address", formData.address);
    if (formData.password) data.append("password", formData.password);
    if (formData.image) data.append("image", formData.image);

    try {
      await dispatch(updateUserAccount(data)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Account</h1>

      {/* Profile Image */}
      <div className="relative w-36 h-36 mx-auto mb-6">
        <img
          src={previewImage}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-indigo-600 shadow-md"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <Camera size={20} className="text-indigo-600" />
        </button>
        <input
          type="file"
          name="image"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* Account Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full p-2 border rounded focus:ring focus:ring-indigo-300"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full p-2 border rounded focus:ring focus:ring-indigo-300"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Toggle Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          {!showPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(true)}
              className="mt-1 text-indigo-600 hover:underline text-sm"
            >
              Change Password
            </button>
          ) : (
            <input
              type="password"
              name="password"
              className="mt-1 block w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Read-only Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-700">
            {formData.role || "N/A"}
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            className="mt-1 block w-full p-2 border rounded focus:ring focus:ring-indigo-300"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
