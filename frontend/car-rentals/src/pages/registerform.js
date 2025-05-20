import React from "react";
import axios from "axios"
import {useState}from "react";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
export default function Register(){
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
    } catch (error) {
      setServerErrors(error.response?.data?.errors || ["Something went wrong"]);
      setClientErrors({});
    }
  };
      return (
         <div className="min-h-screen flex items-right justify-end px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-100 to-indigo-100 bg-cover bg-center bg-no-repeat" 
         style={{ 
           backgroundImage: "url('https://i.pinimg.com/736x/b8/46/3d/b8463dce728fb896bba18846e9e04c9e.jpg')",
         }}>
      <div className="w-full max-w-md bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        {serverErrors && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded mb-4 text-sm">
            <h4 className="font-semibold mb-1">Submission failed:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {serverErrors.map((err, i) => (
                <li key={i}>{err.message || err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              className="mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
            {clientErrors.name && <p className="text-red-500 text-xs mt-1">{clientErrors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
            />
            {clientErrors.email && <p className="text-red-500 text-xs mt-1">{clientErrors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {clientErrors.password && <p className="text-red-500 text-xs mt-1">{clientErrors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                className="mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-2.5 right-3 text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {clientErrors.confirmpassword && (
              <p className="text-red-500 text-xs mt-1">{clientErrors.confirmpassword}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              type="text"
              className="mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
            {clientErrors.phone && <p className="text-red-500 text-xs mt-1">{clientErrors.phone}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="provider"
                  checked={role === "provider"}
                  onChange={() => setRole("provider")}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Provider</span>
              </label>
            </div>
            {clientErrors.role && <p className="text-red-500 text-xs mt-1">{clientErrors.role}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>
    </div>

        
      )
}