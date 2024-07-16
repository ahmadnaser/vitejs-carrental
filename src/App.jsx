
import React, { useState } from 'react';
import Login from './views/Login'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Dashboard from './views/Dashboard'; 
import RentedCar from './views/Rental-Management/RentedCar'; 
import RentalContract from './views/Rental-Management/RentalContracta'; 
import AddRentalForm from './views/Rental-Management/AddRentalContract'; 
import AddTenants from './views/Tenants-Management/AddTenants';
import Reservation from './views/Reservations/Reservations';
import Tenants from './views/Tenants-Management/Tenants';
import Cars from './views/Cars-Management/Cars';

import SellCar from './views/SellCar'; 
import Settings from './views/Settings'; 
import Layout from './components/Layout/Layout';  


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
      <Route path="/renting/rented-car" element={isLoggedIn ? <Layout><RentedCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/renting/rental-contracts" element={isLoggedIn ? <Layout><RentalContract /></Layout> : <Navigate to="/login" />} />
      <Route path="/renting/add-rental-contract" element={isLoggedIn ? <Layout><AddRentalForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/renting/reservations" element={isLoggedIn ? <Layout><Reservation /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants" element={isLoggedIn ? <Layout><Tenants /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants/add-tenants" element={isLoggedIn ? <Layout><AddTenants /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars" element={isLoggedIn ? <Layout><Cars /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/car-tracking" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/traffic-violations" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/messages" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/settings" element={isLoggedIn ? <Layout><Settings /></Layout> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;