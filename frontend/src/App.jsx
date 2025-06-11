import { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import About from './components/about';
import Home from './pages/Home';
import Register from './components/register';
import Login from './components/login';
import Account from './components/account';
import Cars from './components/carsContainer';
import PrivateRoute from './components/privateRoute';
import ProtectedRoute from './components/protectedRoute';
import Unauthorized from './components/unauathorized';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import UserList from './components/userList';
import AdminDashboard from './pages/adminDashboard';
import ApproveCars from './components/apporvecars';
import CarBookingForm from './components/booking/carbookingForm';
import UserBooking from './components/booking/usercarbooking';
import { logout, fetchUserAccount } from './slices/userSlice';
import { fetchAllCars } from './slices/carslices';
import CarLists from './components/carslists';
import  ContactUs from "./pages/contact"
import Carsform from './components/carsform';
import Payment from './components/payments';

function App() {
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserAccount());
      dispatch(fetchAllCars());
    }
  }, [localStorage.getItem('token'),dispatch]);

  return (
 <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
    {/* Navbar */}
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white shadow-md flex items-center justify-between p-4">

      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold text-red-400">G</span>
        <h1 className="text-xl font-semibold">GEN-GO CAR RENTALS</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="text-lg"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {isLoggedIn ? (
          <>
            <Link className="hover:underline" to="/account">Account</Link>
            {userData?.role === 'provider' && (
              <Link className="hover:underline" to="/cars">Cars</Link>
            )}
            {userData?.role === 'admin' && (
              <>

                <Link className="hover:underline" to="/userlist">Users</Link>
                <Link className='hover:underline' to="/approve-cars">ApproveCars</Link>
                <Link className="hover:underline" to="/admindashboard">Dashboard</Link>
                
              </>
            )}
             <Link  className="hover:underline" to="/userBookingList">BookingList</Link>
            {userData?.role === 'user' && (
              <>
              <Link className="hover:underline" to="/carlist">Cars</Link>
             
              </>
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
            <Link className=" px-3 py-1 rounded"to="/register">Register</Link>
            <Link className="" to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>

    {/* Main Content */}
    <main className="flex-grow pt-20 p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/approve-cars" element={<ApproveCars />} />
        <Route path="/userBookingList" element={<UserBooking/>}/>
        <Route path="/carbooking/:id" element={<CarBookingForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/carlist" element={<CarLists />} />
         <Route path="/carform" element={<Carsform />} />
        <Route path="/cars" element={
          <PrivateRoute>
            <ProtectedRoute roles={['provider', 'user']}>
              <Cars />
            </ProtectedRoute>
          </PrivateRoute>
        } />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path='/payments'element={<Payment/>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </main>

   <footer className="backdrop-blur-md bg-white/10 border-t border-white/30 text-blue py-6 px-8">
  <p className="mb-2">© 2025 GEN-GO Car Rentals. All rights reserved.</p>
  <div className="flex justify-center gap-4">
    <Link to="/about" className="hover:underline">AboutUs</Link>
    <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
    <Link to="/contact" className="hover:underline">Contact Us</Link> 
  </div>
</footer>

  </div>
);
}
export default App