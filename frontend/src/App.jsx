import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Home from './components/Home'
import Register from "./components/register"
import Login from './components/login'
import Account from './components/account'
import Cars from './components/carsContainer'
import PrivateRoute from "./components/privateRoute"
import ProtectedRoute from "./components/protectedRoute"
import Unauthorized from "./components/unauathorized"
import ForgotPassword from "./components/forgotpassword"
import ResetPassword from './components/restpassword'
import UserList from './components/userList'
import { logout, fetchUserAccount } from "./slices/userSlice"

function App() {
  const { isLoggedIn, userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(fetchUserAccount())
    }
  },[dispatch])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">GEN-GO CAR RENTALS</h1>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/account" className="text-gray-700 hover:text-indigo-600 font-medium">Account</Link>
              {userData && userData.role === "provider" && (
                <Link to="/cars" className="text-gray-700 hover:text-indigo-600 font-medium">Cars</Link>
              )}
              {userData&&userData.role === "admin" && (
                  <Link
                    to="/userlist"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    UserList
                  </Link>
                )}
              <button
                onClick={() => {
                  dispatch(logout())
                  localStorage.removeItem("token")
                  navigate("/login")
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
              <Link to="/register" className="text-gray-700 hover:text-indigo-600 font-medium">Register</Link>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">Login</Link>
              
            </>
          )}
        </div>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userlist" element={<UserList/>} />
          
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/cars" element={<PrivateRoute><ProtectedRoute roles={["provider"]}><Cars /></ProtectedRoute></PrivateRoute>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/resetpassword" element={<ResetPassword/>}/>

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

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
