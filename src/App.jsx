// App.jsx
import React, { useState } from 'react';
import Login from './pages/Login'; // Adjust the import path as necessary
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Ensure Routes is imported here
import Dashboard from './pages/Dashboard'; // Adjust the import path as necessary
import Bookings from './pages/Bookings'; // Adjust the import path as necessary
import SellCar from './pages/SellCar'; // Adjust the import path as necessary
import Settings from './pages/Settings'; // Adjust the import path as necessary
import Layout from './components/Layout/Layout'; // Adjust the import path as necessary
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