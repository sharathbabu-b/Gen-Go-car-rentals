import React, { useState } from "react";
import axios from "../axios/axios";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) errors.name = "Name field is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!isEmail(email)) errors.email = "Email is invalid";

    if (!password.trim()) errors.password = "Password is required";
    else if (password.length < 8 || password.length > 128)
      errors.password = "Password should be 8–128 characters";

    if (!confirmpassword.trim()) errors.confirmpassword = "Confirm your password";
    else if (password !== confirmpassword)
      errors.confirmpassword = "Passwords do not match";

    if (!phone.trim()) errors.phone = "Phone number is required";

    if (!role) errors.role = "Please select a role";

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    try {
      const formData = { name, email, password, phone, role };
      const response = await axios.post("/register", formData);
      console.log(response.data);
      navigate("/login");
      toast.success('Registration successful!');
    } catch (error) {
      toast.error(err.response?.data?.message || 'Registration failed');
      setClientErrors({});
    }
  };

  return (
 <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
  <div className="w-full max-w-xl bg-white shadow-2xl rounded-lg px-10 py-12">
   
    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Create Your Account</h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {clientErrors.name && <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {clientErrors.email && <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
          />
          <span
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {clientErrors.password && <p className="text-red-500 text-sm mt-1">{clientErrors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
          />
          <span
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {clientErrors.confirmpassword && <p className="text-red-500 text-sm mt-1">{clientErrors.confirmpassword}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g., +91 98765 43210"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {clientErrors.phone && <p className="text-red-500 text-sm mt-1">{clientErrors.phone}</p>}
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2 text-gray-700">User</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="provider"
              checked={role === "provider"}
              onChange={() => setRole("provider")}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2 text-gray-700">Provider</span>
          </label>
        </div>
        {clientErrors.role && <p className="text-red-500 text-sm mt-1">{clientErrors.role}</p>}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-md transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </form>

    <p className="text-sm text-center text-gray-600 mt-6">
      Already have an account?{" "}
      <a href="/login" className="text-indigo-600 font-medium hover:underline">
        Sign In
      </a>
    </p>
  </div>
</div>


  );
}