import {Link,Routes,Route} from "react-router-dom"
import './App.css';
import Register from './pages/registerform';

function App() {
  return (
     <div className="h-screen w-screen overflow-hidden bg-gray-100">
      {/* Fixed Navigation Bar */}
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
                <Link to="/admindashboard"  className="text-gray-300 hover:text-white font-medium">Dashboard</Link>
                </>
              )}
              {/* {userData?.role==="user"&&(
                <>
                </>
              )} */}
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
               <Link to="/register" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md">
                Register
              </Link>
              <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Scrollable Content Below Navbar */}
      <main className="pt-20 h-full overflow-auto px-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/userlist" element={<UserList />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/admindashboard" element={<AdminDashboard/>}/>
          <Route path='/carbooking' element={<UserCarBooking/>}/>
          <Route path="/about" element={<About />} />
         
          <Route
            path="/cars"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={['provider','user']}>
                  <Cars />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
