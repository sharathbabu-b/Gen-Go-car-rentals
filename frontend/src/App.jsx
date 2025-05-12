

import { Link,Routes,Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Register from "./components/register"
import Login from './components/login'
import Account from './components/account'
import About from './components/about'


function App() {

  return (
    <div>
      <nav>
      <h1>GEN-G0 CAR RENTALS</h1>
      <Link to="/">Home</Link>|
      <Link to="/register">Register</Link>|
      <Link to="/login">Login</Link>|
      <Link to="/account">Account</Link>
      <Link to="/about">About</Link>|
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register"element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path='/about'element={<About/>}/>
        <Route/>
      </Routes>
      
     

      </div>
 
  )
}

export default App
