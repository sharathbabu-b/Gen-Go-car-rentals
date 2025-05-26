import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import About from './components/about';
import Home from './pages/Home'
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
// import SubscriptionPage from './components/subscription';
// import TermsAndConditions from "./components/terms &conditions"
import { logout, fetchUserAccount } from './slices/userSlice';
import { fetchAllCars } from './slices/carslices';
import CarLists from './components/carslists';
// import Privacy from './components/Privacy'; 

function App() {
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserAccount());
      dispatch(fetchAllCars());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100 ">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            GEN-GO CAR RENTALS
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/account" className="text-gray-300 hover:text-white font-medium">
                Account
              </Link>
              {userData?.role === 'provider' && (
                <Link to="/cars" className="text-gray-300 hover:text-white font-medium">
                  Cars
                </Link>
              )}
              {userData?.role === 'admin' && (
                <>
                  <Link to="/userlist" className="text-gray-300 hover:text-white font-medium">
                    UserList
                  </Link>
                  <Link to="/admindashboard" className="text-gray-300 hover:text-white font-medium">
                    Dashboard
                  </Link>
                </>
              )}
              {userData?.role === 'user' && (
                <Link to="/carlist" className="text-gray-300 hover:text-white font-medium">
                  Cars
                </Link>
              )}
              <button
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-20 flex-grow px-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home/>}/> 
          <Route path="/userlist" element={<UserList />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/carbooking" element={<UserCarBooking />} />
          <Route path="/about" element={<About />} />
          <Route path="/carlist" element={<CarLists />} />
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
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* <Route path="/privacy" element={<Privacy />} /> */}
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-sm py-4 px-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-2 md:mb-0">© 2025 GEN-GO Car Rentals. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <a href="mailto:support@gengo.com" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
