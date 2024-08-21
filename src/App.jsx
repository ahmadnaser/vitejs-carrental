
import React, { useState } from 'react';
import Layout from './components/Layout/Layout';  
import Login from './components/Login'; 
import {Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import Dashboard from './components/Dashboard'; 
import RentedCar from './components/rental/rental_management/RentedCar'; 
import RentalContract from './components/rental/rental_management/RentalContract'; 
import AddRentalForm from './components/rental/rental_management/AddRentalContract';
import EditRentalForm from './components/rental/rental_management/EditRentalContract';  
import AddTenants from './components/rental/tenants_management/AddTenants';
import Reservation from './components/rental/reservation_managment/Reservations';
import AddReservationForm from './components/rental/reservation_managment/AddReservations';
import Tenants from './components/rental/tenants_management/Tenants';
import PaymentForm from './components/rental/tenants_management/Payment';
import TenantsDetalis from './components/rental/tenants_management/TenantsDetails';
import Cars from './components/rental/cars_managemnt/Cars';
import AddCarForm from './components/rental/cars_managemnt/AddCar';
import CarsMaintenanceTable from './components/expensese/cars_maintenance/CarsMaintenance';
import AddMaintenanceForm from './components/expensese/cars_maintenance/AddCarMaintenance';
import CustomerAccountStatementForm from './components/reports/customer_statement/CustomerStatement';
import ContractStatmentTable from './components/reports/customer_statement/ContractStatement';
import AccountStatementTable from './components/reports/customer_statement/AccountStatement';
import CarAccountStatementForm from './components/reports/car_statement/CarStatement';
import CarAccountStatementTable from './components/reports/car_statement/CarAccountStatementTable';
import CarExpenseTable from './components/reports/car_statement/CarExpenseTable';
import ExpensesAccountStatementForm from './components/reports/expensese_statement/ExpensesStatement';
import ExpenseseStatementTable from './components/reports/expensese_statement/ExpensesStatementTable';
import GarageStatementForm from './components/reports/garage_statement/GarageStatement';
import GarageStatementTable from './components/reports/garage_statement/GarageStatementTable';
import GarageTable from './components/expensese/garage_management/Garage';
import TraderStatementTable from './components/reports/trader_statement/TraderStatementTable';
import TraderStatementForm from './components/reports/trader_statement/TraderStatement';
import FullAccountStatementForm from './components/reports/full_account_statement/FullAccountStatement';
import FullAccountStatementTable from './components/reports/full_account_statement/FullAccountStatementTable';
import LedgerForm from './components/reports/ledger/Ledger';
import AddGarageForm from './components/expensese/garage_management/AddGarage';
import TraderTable from './components/expensese/trader_management/Traders';
import AddTraderForm from './components/expensese/trader_management/AddTrader';
import ExpenseTypeTable from './components/expensese/expenses_type_management/Expenses';
import GeneralExpenseseForm from './components/expensese/GeneralExpenses';
import AddExpenseTypeForm from './components/expensese/expenses_type_management/AddExpenses';
import BeneficiaryTable from './components/expensese/beneficiaries_management/Beneficiaries';
import AddBeneficiaryForm from './components/expensese/beneficiaries_management/AddBeneficiary';
import Settings from './components/settings/Settings'; 
import BlackListTable from './components/settings/BlackList'; 


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
      <Route path="/tenants/payment" element={isLoggedIn ? <Layout><PaymentForm tenantId={tenantId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars" element={isLoggedIn ? <Layout><Cars /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars/add-car" element={isLoggedIn ? <Layout><AddCarForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/car-maintenance" element={isLoggedIn ? <Layout><CarsMaintenanceTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/general-expenses" element={isLoggedIn ? <Layout><GeneralExpenseseForm /></Layout> : <Navigate to="/login" />} />
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
      <Route path="/reports/customer-statement/account" element={isLoggedIn ? <Layout><AccountStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/car-statement" element={isLoggedIn ? <Layout><CarAccountStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/car-statement/account-statement" element={isLoggedIn ? <Layout><CarAccountStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/car-statement/expenses-statement" element={isLoggedIn ? <Layout><CarExpenseTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/expensese-statement" element={isLoggedIn ? <Layout><ExpensesAccountStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/expensese-statement/statement" element={isLoggedIn ? <Layout><ExpenseseStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/full-account-statement" element={isLoggedIn ? <Layout><FullAccountStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/full-account-statement/statement" element={isLoggedIn ? <Layout><FullAccountStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/trader-statement" element={isLoggedIn ? <Layout><TraderStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/trader-statement/statement" element={isLoggedIn ? <Layout><TraderStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/garage-statement" element={isLoggedIn ? <Layout><GarageStatementForm /></Layout> : <Navigate to="/login" />} /> 
      <Route path="/reports/garage-statement/statement" element={isLoggedIn ? <Layout><GarageStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/ledger-statement" element={isLoggedIn ? <Layout><LedgerForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/settings" element={isLoggedIn ? <Layout><Settings /></Layout> : <Navigate to="/login" />} />
      <Route path="/settings/black-list" element={isLoggedIn ? <Layout><BlackListTable /></Layout> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;