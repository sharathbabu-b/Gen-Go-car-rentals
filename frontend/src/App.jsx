import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import About from './components/about';
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
import SubscriptionPage from './components/subscription';
import TermsAndConditions from "./components/terms &conditions"
import { logout, fetchUserAccount } from './slices/userSlice';

function App() {
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserAccount());
    }
  }, [dispatch]);

  const handleFindNow = () => {
    navigate('/cars');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md w-full box-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            GEN-GO CAR RENTALS
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
           
            
          </div>
          {isLoggedIn ? (
            <>
              <Link to="/account" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Account
              </Link>
              {userData && userData.role === 'provider' && (
                <Link to="/cars" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                  Cars
                </Link>
              )}
              {userData && userData.role === 'admin' && (
                <Link to="/userlist" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                  UserList
                </Link>
              )}
              <button
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/subscription" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Subscription
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                About Us
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Terms & Conditions
              </Link>
              <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
         <Route path="/terms" element={<TermsAndConditions />} />
         <Route path="/about" element={<About/>}/>
         <Route path="/subscription" element={<SubscriptionPage/>}/>
        <Route
          path="/cars"
          element={
            <PrivateRoute>
              <ProtectedRoute roles={['provider']}>
                <Cars />
              </ProtectedRoute>
            </PrivateRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;

// import { Link,Routes,Route, useNavigate } from 'react-router-dom'
// import './App.css'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import Home from './components/Home'
// import Register from "./components/register"
// import Login from './components/login'
// import Account from './components/account'
// import Cars from './components/carsContainer'
// import PrivateRoute from "./components/privateRoute"
// import ProtectedRoute from "./components/protectedRoute"
// import Unauthorized from "./components/unauathorized"
// // import About from './components/about'
// import {logout,fetchUserAccount} from "./slices/userSlice"

// function App() {
//   const {isLoggedIn,userData}=useSelector((state)=>{
//     return state.user
//   })
//   const dispatch=useDispatch()
//   const navigate=useNavigate()
//   useEffect(()=>{
//     if(localStorage.getItem("token")){
//       dispatch(fetchUserAccount())
//     }
//   },[dispatch])

//   return (
//     <div>
//       <nav>
//       <h1>GEN-G0 CAR RENTALS</h1>
//       {isLoggedIn?(
//         <>
//          <Link to="/account">Account</Link>
//          {userData&&userData.role=="provider" &&(
//           <Link to="/cars">Cars</Link>
//          )}
//          <button onClick={()=>{
//           dispatch(logout())
//           localStorage.removeItem("token");
//           navigate("/login")
//          }}>Logout</button>
        
//         </>
//       ):(
//         <>
//          <Link to="/">Home</Link>|
//          <Link to="/register">Register</Link>|
//       <Link to="/login">Login</Link>
//         </>

//       )}
     
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/register"element={<Register/>}/>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>}/>
//         <Route path="/cars" element={<PrivateRoute><ProtectedRoute><Cars/></ProtectedRoute></PrivateRoute>}/>
      
//         <Route/>
//       </Routes>
      
     

//       </div>
 
//   )
// }

// export default App
