import { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn, UserPlus } from "phosphor-react";
import { Sun, Moon } from "lucide-react";

import PaymentSuccess from './pages/paymentSuccess';
import AccountPage from './components/account';
import AdminpaymentList from './pages/adminpaymentslist';
import About from './components/about';
import SearchCars from './pages/searchCars';
import PrivacyPolicy from "./pages/privacy policy";
import Home from './pages/Home';
import Register from './components/register';
import Login from './components/login';
import Cars from './components/carsContainer';
import PrivateRoute from './components/privateRoute';
import ProtectedRoute from './components/protectedRoute';
import Unauthorized from './components/unauathorized';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import UserList from './components/userList';
import AdminDashboard from './pages/adminDashboard';
import ApproveCars from './components/apporvecars';
import CarBookingForm from "./components/booking/CarbookingForm"
import UserBooking from './components/booking/usercarbooking';
import { logout, fetchUserAccount } from './slices/userSlice';
import { fetchAllCars } from './slices/carslices';
import CarLists from './components/carslists';
import ContactUs from "./pages/contact";
import Carsform from './components/carsform';
import RazorpayPayment from './components/payments';
import AddReviewForm from "./components/carReviewpage"

function App() {
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserAccount());
      dispatch(fetchAllCars());
    }
  }, [dispatch]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white shadow-md flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <span className="w-10 h-10 flex items-center justify-center text-2xl font-bold text-orange-500 bg-red-100 rounded-full cursor-pointer hover:bg-red-200 transition">
              G
            </span>
          </Link>
          <h1 className="text-xl font-semibold">GEN-GO CAR RENTALS</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* 🌙/☀️ Dark Mode Toggle */}
          <button
  onClick={() => setDarkMode(!darkMode)}
  aria-label="Toggle Dark Mode"
  className="text-white dark:text-yellow-300 transition duration-300"
>
  {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
</button>

          {isLoggedIn ? (
            <>
             <Link to="/add-review" className="hover:underline">
      Add Review
    </Link>
              {userData?.role === 'provider' && (
                <Link className="hover:underline" to="/cars">Cars</Link>
              )}
              {userData?.role === 'admin' && (
                <>
                  <Link className="hover:underline" to="/userlist">Users</Link>
                  
                  <Link className='hover:underline' to="/approve-cars">Approve Cars</Link>
                  <Link className="hover:underline" to="/admindashboard">Dashboard</Link>
                </>
              )}
              <Link className='hover:underline' to="/account">Account</Link>
              <Link className="hover:underline" to="/userBookingList">Booking List</Link>
              {userData?.role === 'user' && (
                <Link className="hover:underline" to="/carlist">Cars</Link>
              )}
              <button
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
            <Link
  to="/register"
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
>
  <UserPlus size={20} weight="bold" />
  Register
</Link>

<Link
  to="/login"
  className="bg-gray-200 dark:bg-gray-700 dark:text-white text-gray-800 px-4 py-2 rounded border hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2"
>
  <SignIn size={20} weight="bold" />
  Login
</Link>

            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<AccountPage/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/approve-cars" element={<ApproveCars />} />
          <Route path="/userBookingList" element={<UserBooking />} />
          <Route path="/carbooking/:id" element={<CarBookingForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/carlist" element={<CarLists />} />
          <Route path="/carform" element={<Carsform />} />
          <Route path="/adminpaymentlist"element={ <PrivateRoute>
    <ProtectedRoute roles={['admin']}>
      <AdminpaymentList/>
    </ProtectedRoute>
  </PrivateRoute>}/>
          <Route
            path="/cars"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={['provider', 'user']}>
                  <Cars />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/payments/:id' element={<RazorpayPayment />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/search-cars" element={<SearchCars />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/payment-success/:bookingId" element={<PaymentSuccess/>} />
          <Route path="/reviews/:carId" element={<AddReviewForm />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-black/10 border-t border-white/30 text-blue py-6 px-8">
        <p className="mb-2">© 2025 GEN-GO Car Rentals. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}

export default App;
