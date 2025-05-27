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
import ResetPassword from './components/restpassword';
import UserList from './components/userList';
import AdminDashboard from './pages/adminDashboard';
import UserCarBooking from './components/booking/usercarbooking';
import { logout, fetchUserAccount } from './slices/userSlice';
import { fetchAllCars } from './slices/carslices';
import CarLists from './components/carslists';

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
  }, [dispatch]);

  return (
  <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen over-flow:fixed' }>
    {/* Navbar */}
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white shadow-md flex items-center justify-between p-4">

      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold text-yellow-400">G</span>
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
                <Link className="hover:underline" to="/admindashboard">Dashboard</Link>
              </>
            )}
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
            <Link className="hover:underline" to="/register">Register</Link>
            <Link className="hover:underline" to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>

    {/* Main Content */}
    <main className="pt-20 p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/carbooking" element={<UserCarBooking />} />
        <Route path="/about" element={<About />} />
        <Route path="/carlist" element={<CarLists />} />
        <Route path="/cars" element={
          <PrivateRoute>
            <ProtectedRoute roles={['provider', 'user']}>
              <Cars />
            </ProtectedRoute>
          </PrivateRoute>
        } />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </main>

    {/* Footer */}
    <footer className="bg-gray-800 text-white p-4 text-center mt-10">
      <p className="mb-2">© 2025 GEN-GO Car Rentals. All rights reserved.</p>
      <div className="flex justify-center gap-4">
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        <a href="mailto:support@gengo.com" className="hover:underline">Contact</a>
      </div>
    </footer>
  </div>
);
}
export default App