
import React, { useState } from 'react';
import Layout from './components/Layout/Layout';  
import Login from './components/Login'; 
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import Dashboard from './components/Dashboard'; 
import RentedCar from './components/Rental-Management/RentedCar'; 
import RentalContract from './components/Rental-Management/RentalContracta'; 
import AddRentalForm from './components/Rental-Management/AddRentalContract';
import EditRentalForm from './components/Rental-Management/EditRentalContract';  
import AddTenants from './components/Tenants-Management/AddTenants';
import Reservation from './components/reservation_managment/Reservations';
import AddReservationForm from './components/reservation_managment/AddReservations';
import Tenants from './components/Tenants-Management/Tenants';
import TenantsDetalis from './components/Tenants-Management/TenantsDetails';
import Cars from './components/cars_managemnt/Cars';
import AddCarForm from './components/cars_managemnt/AddCar';
import CarsMaintenanceTable from './components/cars_maintenance/CarsMaintenance';
import SellCar from './components/SellCar'; 
import Settings from './components/Settings'; 


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const tenantId = location.state?.tenantId;

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
      <Route path="/renting/edit-rental-contract" element={isLoggedIn ? <Layout><EditRentalForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reservations" element={isLoggedIn ? <Layout><Reservation /></Layout> : <Navigate to="/login" />} />
      <Route path="/reservations/add-reservations" element={isLoggedIn ? <Layout><AddReservationForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants" element={isLoggedIn ? <Layout><Tenants /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants/add-tenants" element={isLoggedIn ? <Layout><AddTenants /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants/details" element={isLoggedIn ? <Layout><TenantsDetalis tenantId={tenantId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars" element={isLoggedIn ? <Layout><Cars /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars/add-car" element={isLoggedIn ? <Layout><AddCarForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/car-maintenance" element={isLoggedIn ? <Layout><CarsMaintenanceTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/car-tracking" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/traffic-violations" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/messages" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/settings" element={isLoggedIn ? <Layout><Settings /></Layout> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;