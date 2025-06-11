import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userSlice"
import axios from "../axios/axios";
import { toast } from 'react-toastify'
import logo from '../assets/logo1.png'
// import logo from "src/assests/"
import { fetchUserAccount } from "../slices/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const togglePasswordVisibility = () => setShowPassword(!showPassword);


  useEffect(()=>{
     if(localStorage.getItem('token')){
      dispatch(fetchUserAccount());
     }
  },[localStorage.getItem('token'),dispatch]);

  const userAccount = useSelector((state)=> state.user);
  console.log(userAccount)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = {}
    if (email.trim().length == 0) {
      errors.email = "Email is required"
    } else if (!isEmail(email)) {
      errors.email = "Email is invalid"
    }
    if (password.trim().length === 0) {
      errors.password = 'Password is required';
    } else if (password.trim().length < 8 || password.trim().length > 128) {
      errors.password = 'Password should be between 8 to 128 characters';
    }
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
    } else {
      const formData = { email, password };
      try {
        const resposne = await axios.post("/login", formData)
        localStorage.setItem("token", resposne.data.token)
        const userResponse = await axios.get("/account", { headers: { Authorization: localStorage.getItem("token") } })
        dispatch(login(userResponse.data))
        toast.success('Login successful!');
        if(userAccount.role=='admin'){
          navigate('/admindashboard');
        }
        navigate("/account")
      } catch (error) {
        setServerErrors(errors.response?.data?.error)
        setClientErrors({})
        toast.error('Login failed');
      }
    }
  }


  return (
    <div className="min-h-screen flex w-full">
      {/* Left car image */}
      <div
        className=" md:block w-full bg-cover bg-center rounded flex items-center justify-center "
        style={{ backgroundImage: "url('https://spncarrentals.com/images/cab-rental-madurai.jpg')" }}
      >
        <div className="flex justify-center items-center h-full">
          {/* Right login form */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md p-8 border-2 rounded-[8px] mr-60 mb-40 bg-white/10 backdrop-blur-lg border border-white/30">
            <div className="flex justify-center mt-[-60px]">
              <img src={logo} alt="" className="w-[100px] h-[100px] bg-gray-800 rounded-full border-2 border-gray-100"/>
            </div>
              <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome to GEN-GO</h2>
              {serverErrors && (
                <div className="mb-4 text-red-600 text-center">
                  <p>{serverErrors}</p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-orange-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {clientErrors.email && (
                    <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>
                  )}
                </div>

                {/* Password Field with Eye */}
                <div className="mb-6 relative">
                  <label htmlFor="password" className="block text-sm font-medium text-orange-600">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    placeholder="**********"
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {clientErrors.password && (
                    <p className="text-sm text-red-500 mt-1">{clientErrors.password}</p>
                  )}
                </div>
                <div className="mb-6 text-right">
                  <a
                    href="/forgotpassword"
                    className="text-sm text-indigo-600 hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-400 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                >
                  Sign In
                </button>

                {serverErrors && <p className="text-red-600 text-center mt-4">{serverErrors}</p>}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Don’t have an account?
                  <a
                    href="/register"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
