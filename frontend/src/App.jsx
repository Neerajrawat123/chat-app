import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "./context/userContext";

function ProctedRoute() {
  const {user} = useContext(userContext)
  console.log(user)
  return ( user !== null ? <Outlet /> : <Navigate to={'/login'} />)
}

axios.defaults.baseURL = 'http://localhost:4000'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element ={<ProctedRoute />}>

        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
