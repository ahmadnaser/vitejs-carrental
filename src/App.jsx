
import React, { useState } from 'react';
import Login from './pages/Login'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard'; 
import Bookings from './pages/Bookings'; 
import SellCar from './pages/SellCar'; 
import Settings from './pages/Settings'; 
import Layout from './components/Layout/Layout';  
import "./styles/App.css"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={isLoggedIn ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
      <Route path="/bookings" element={isLoggedIn ? <Layout><Bookings /></Layout> : <Navigate to="/login" />} />
      <Route path="/sell-car" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/settings" element={isLoggedIn ? <Layout><Settings /></Layout> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;