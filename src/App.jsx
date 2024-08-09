
import React, { useState } from 'react';
import Layout from './components/Layout/Layout';  
import Login from './components/Login'; 
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import Dashboard from './components/Dashboard'; 
import RentedCar from './components/rental_management/RentedCar'; 
import RentalContract from './components/rental_management/RentalContracta'; 
import AddRentalForm from './components/rental_management/AddRentalContract';
import EditRentalForm from './components/rental_management/EditRentalContract';  
import AddTenants from './components/Tenants-Management/AddTenants';
import Reservation from './components/reservation_managment/Reservations';
import AddReservationForm from './components/reservation_managment/AddReservations';
import Tenants from './components/Tenants-Management/Tenants';
import TenantsDetalis from './components/Tenants-Management/TenantsDetails';
import Cars from './components/cars_managemnt/Cars';
import AddCarForm from './components/cars_managemnt/AddCar';
import CarsMaintenanceTable from './components/cars_maintenance/CarsMaintenance';
import AddMaintenanceForm from './components/cars_maintenance/AddCarMaintenance';
import CustomerAccountStatementForm from './components/reports/customer_statement/CustomerStatement';
import ContractStatmentTable from './components/reports/customer_statement/ContractStatement';
import GarageTable from './components/garage_management/Garage';
import AddGarageForm from './components/garage_management/AddGarage';
import TraderTable from './components/trader_management/Traders';
import AddTraderForm from './components/trader_management/AddTrader';
import ExpenseTypeTable from './components/expenses_type_management/Expenses';
import AddExpenseTypeForm from './components/expenses_type_management/AddExpenses';
import BeneficiaryTable from './components/beneficiaries_management/Beneficiaries';
import AddBeneficiaryForm from './components/beneficiaries_management/AddBeneficiary';
import SellCar from './components/SellCar'; 
import Settings from './components/Settings'; 


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const tenantId = location.state?.tenantId;

  const handleLogin = () => {
    setIsLoggedIn(true);
    }

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
      <Route path="/expenses/car-maintenance/add-maintenance" element={isLoggedIn ? <Layout><AddMaintenanceForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/garages" element={isLoggedIn ? <Layout><GarageTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/garages/add-garage" element={isLoggedIn ? <Layout><AddGarageForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/traders" element={isLoggedIn ? <Layout><TraderTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/traders/add-trader" element={isLoggedIn ? <Layout><AddTraderForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/beneficiaries" element={isLoggedIn ? <Layout><BeneficiaryTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/beneficiaries/add-beneficiary" element={isLoggedIn ? <Layout><AddBeneficiaryForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/types-of-expenses" element={isLoggedIn ? <Layout><ExpenseTypeTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/types-of-expenses/add-expenses-type" element={isLoggedIn ? <Layout><AddExpenseTypeForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/customer-statement" element={isLoggedIn ? <Layout><CustomerAccountStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/customer-statement/contract" element={isLoggedIn ? <Layout><ContractStatmentTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/car-tracking" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/traffic-violations" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/messages" element={isLoggedIn ? <Layout><SellCar /></Layout> : <Navigate to="/login" />} />
      <Route path="/settings" element={isLoggedIn ? <Layout><Settings /></Layout> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;