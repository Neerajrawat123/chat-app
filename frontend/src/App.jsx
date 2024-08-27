import { BrowserRouter,  Navigate,  Outlet,  Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import { useUserStore } from "./store/userStore";

function ProctedRoute() {
  const user = useUserStore((state) => state.currentUser)
  
  return ( user !== null ? <Outlet /> : <Navigate to={'/login'} />)
}

axios.defaults.baseURL = 'http://localhost:4000'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path='/' element ={<ProctedRoute />}>

        <Route path="/" element={<Dashboard />} />
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
