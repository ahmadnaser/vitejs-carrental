
import React, { useState } from 'react';
import Layout from './components/Layout/Layout';  
import Login from './components/Login'; 
import {Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import Dashboard from './components/Dashboard'; 
import RentedCar from './components/rental/rental_management/RentedCar'; 
import RentalContract from './components/rental/rental_management/RentalContract'; 
import RentalDetails from './components/rental/rental_management/RentalDetails'; 
import ExtensionRentalContract from './components/rental/rental_management/ExtensionRentalContract'; 
import AddRentalForm from './components/rental/rental_management/AddRentalContract';
import EditRentalForm from './components/rental/rental_management/EditRentalContract';  
import AddTenants from './components/rental/tenants_management/AddTenants';
import Reservation from './components/rental/reservation_managment/Reservations';
import ConvertReservationForm from './components/rental/reservation_managment/ConvertReservations';
import AddReservationForm from './components/rental/reservation_managment/AddReservations';
import ReservationDetails from './components/rental/reservation_managment/ReservationDetails';
import ExtensionReservation from './components/rental/reservation_managment/ExtensionReservation';
import EditReservationForm from './components/rental/reservation_managment/EditReservations';
import Tenants from './components/rental/tenants_management/Tenants';
import PaymentForm from './components/rental/tenants_management/Payment';
import BankCheckDetails from './components/rental/tenants_management/BankCheckDetails';
import TenantsDetalis from './components/rental/tenants_management/TenantsDetails';
import EditTenantForm from './components/rental/tenants_management/EditTenants';
import Cars from './components/rental/cars_managemnt/Cars';
import CarDetails from './components/rental/cars_managemnt/CarDetails';
import AddCarForm from './components/rental/cars_managemnt/AddCar';
import EditCarForm from './components/rental/cars_managemnt/EditCar';
import ReturnCarTable from './components/rental/return_car_management/ReturnCarTable';
import ReturnForm from './components/rental/return_car_management/ReturnForm';
import CarsMaintenanceTable from './components/expensese/cars_maintenance/CarsMaintenance';
import EditCarMaintenanceForm from './components/expensese/cars_maintenance/EditCarMaintenance';
import CarMaintenanceDetails from './components/expensese/cars_maintenance/CarMaintenanceDetails';
import AddMaintenanceForm from './components/expensese/cars_maintenance/AddCarMaintenance';
import CustomerAccountStatementForm from './components/reports/customer_statement/CustomerStatement';
import ContractStatmentTable from './components/reports/customer_statement/ContractStatement';
import AccountStatementTable from './components/reports/customer_statement/AccountStatement';
import CarAccountStatementForm from './components/reports/car_statement/CarStatement';
import VehicleExpenseTable from './components/reports/car_statement/VehicleExpenseTable';
import VehicleAccountStatementTable from './components/reports/car_statement/VehicleAccountStatementTable';
import ExpensesAccountStatementForm from './components/reports/expensese_statement/ExpensesStatement';
import ExpenseseStatementTable from './components/reports/expensese_statement/ExpensesStatementTable';
import GarageStatementForm from './components/reports/garage_statement/GarageStatement';
import GarageStatementTable from './components/reports/garage_statement/GarageStatementTable';
import GarageTable from './components/expensese/garage_management/Garage';
import GarageDetails from './components/expensese/garage_management/GarageDetails';
import EditGarageForm from './components/expensese/garage_management/EditGarage';
import TraderStatementTable from './components/reports/trader_statement/TraderStatementTable';
import TraderStatementForm from './components/reports/trader_statement/TraderStatement';
import FullAccountStatementForm from './components/reports/full_account_statement/FullAccountStatement';
import FullAccountStatementTable from './components/reports/full_account_statement/FullAccountStatementTable';
import LedgerForm from './components/reports/ledger/Ledger';
import LedgerTable from './components/reports/ledger/LedgerTable';
import AddGarageForm from './components/expensese/garage_management/AddGarage';
import TraderTable from './components/expensese/trader_management/Traders';
import EdirTraderForm from './components/expensese/trader_management/EditTrader';
import TraderDetails from './components/expensese/trader_management/TraderDetails';
import AddTraderForm from './components/expensese/trader_management/AddTrader';
import ExpenseTypeTable from './components/expensese/expenses_type_management/Expenses';
import EditExpenseTypeForm from './components/expensese/expenses_type_management/EditExpenses';
import ExpensesTypeDetails from './components/expensese/expenses_type_management/ExpensesTypeDetails';
import GeneralExpenseseForm from './components/expensese/GeneralExpenses';
import AddExpenseTypeForm from './components/expensese/expenses_type_management/AddExpenses';
import BeneficiaryTable from './components/expensese/beneficiaries_management/Beneficiaries';
import AddBeneficiaryForm from './components/expensese/beneficiaries_management/AddBeneficiary';
import EditBeneficiaryForm from './components/expensese/beneficiaries_management/EditBeneficiary';
import BeneficiaryDetails from './components/expensese/beneficiaries_management/BeneficiaryDetails';
import Settings from './components/settings/Settings'; 
import BlackListTable from './components/settings/BlackList'; 
import AddBlackListForm from './components/settings/AddBlackList'; 


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const tenantId = location.state?.tenantId;
  const check_id = location.state?.check_id;
  const rentalId = location.state?.rentalId;
  const reservationId = location.state?.reservationId;
  const carId = location.state?.carId;
  const maintenanceId = location.state?.maintenanceId;
  const garageId = location.state?.garageId;
  const beneficiaryId = location.state?.beneficiaryId;
  const traderId = location.state?.traderId;
  const expensesTypeId = location.state?.expensesTypeId;


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
      <Route path="/renting/edit-rental-contract" element={isLoggedIn ? <Layout><EditRentalForm rentalId={rentalId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/renting/extension-rental-contract" element={isLoggedIn ? <Layout><ExtensionRentalContract rentalId={rentalId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/renting/details" element={isLoggedIn ? <Layout><RentalDetails rentalId={rentalId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/return-car" element={isLoggedIn ? <Layout><ReturnCarTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/return-car/return" element={isLoggedIn ? <Layout><ReturnForm rentalId={rentalId}/></Layout> : <Navigate to="/login" />} />
      <Route path="/reservations" element={isLoggedIn ? <Layout><Reservation /></Layout> : <Navigate to="/login" />} />
      <Route path="/reservations/add-reservations" element={isLoggedIn ? <Layout><AddReservationForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reservations/edit-reservations" element={isLoggedIn ? <Layout><EditReservationForm reservationId={reservationId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/reservations/extension-reservations" element={isLoggedIn ? <Layout><ExtensionReservation reservationId={reservationId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/reservations/convert-reservations" element={isLoggedIn ? <Layout><ConvertReservationForm reservationId={reservationId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/reservations/details" element={isLoggedIn ? <Layout><ReservationDetails reservationId={reservationId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants" element={isLoggedIn ? <Layout><Tenants /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants/add-tenants" element={isLoggedIn ? <Layout><AddTenants /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants/edit-tenant" element={isLoggedIn ? <Layout><EditTenantForm tenantId={tenantId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants/details" element={isLoggedIn ? <Layout><TenantsDetalis tenantId={tenantId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants/payment" element={isLoggedIn ? <Layout><PaymentForm tenantId={tenantId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/tenants/payment/check_details" element={isLoggedIn ? <Layout><BankCheckDetails check_id={check_id} /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars" element={isLoggedIn ? <Layout><Cars /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars/add-car" element={isLoggedIn ? <Layout><AddCarForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars/details" element={isLoggedIn ? <Layout><CarDetails carId={carId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/cars/edit-car" element={isLoggedIn ? <Layout><EditCarForm carId={carId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/car-maintenance" element={isLoggedIn ? <Layout><CarsMaintenanceTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/car-maintenance/edit" element={isLoggedIn ? <Layout><EditCarMaintenanceForm maintenanceId={maintenanceId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/car-maintenance/details" element={isLoggedIn ? <Layout><CarMaintenanceDetails maintenanceId={maintenanceId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/general-expenses" element={isLoggedIn ? <Layout><GeneralExpenseseForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/car-maintenance/add-maintenance" element={isLoggedIn ? <Layout><AddMaintenanceForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/garages" element={isLoggedIn ? <Layout><GarageTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/garages/add-garage" element={isLoggedIn ? <Layout><AddGarageForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/garages/details" element={isLoggedIn ? <Layout><GarageDetails garageId={garageId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/garages/edit-garage" element={isLoggedIn ? <Layout><EditGarageForm  garageId={garageId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/traders" element={isLoggedIn ? <Layout><TraderTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/traders/add-trader" element={isLoggedIn ? <Layout><AddTraderForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/traders/edit-trader" element={isLoggedIn ? <Layout><EdirTraderForm traderId={traderId}/></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/traders/details" element={isLoggedIn ? <Layout><TraderDetails traderId={traderId}/></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/beneficiaries" element={isLoggedIn ? <Layout><BeneficiaryTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/beneficiaries/add-beneficiary" element={isLoggedIn ? <Layout><AddBeneficiaryForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/beneficiaries/details" element={isLoggedIn ? <Layout><BeneficiaryDetails beneficiaryId={beneficiaryId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/beneficiaries/edit-beneficiary" element={isLoggedIn ? <Layout><EditBeneficiaryForm beneficiaryId={beneficiaryId} /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/types-of-expenses" element={isLoggedIn ? <Layout><ExpenseTypeTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/types-of-expenses/add-expenses-type" element={isLoggedIn ? <Layout><AddExpenseTypeForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/types-of-expenses/edit-expenses-type" element={isLoggedIn ? <Layout><EditExpenseTypeForm expensesTypeId={expensesTypeId}/></Layout> : <Navigate to="/login" />} />
      <Route path="/expenses/types-of-expenses/details" element={isLoggedIn ? <Layout><ExpensesTypeDetails expensesTypeId={expensesTypeId}/></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/customer-statement" element={isLoggedIn ? <Layout><CustomerAccountStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/customer-statement/contract" element={isLoggedIn ? <Layout><ContractStatmentTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/customer-statement/account" element={isLoggedIn ? <Layout><AccountStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/car-statement" element={isLoggedIn ? <Layout><CarAccountStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/car-statement/account-statement" element={isLoggedIn ? <Layout><VehicleAccountStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/car-statement/expenses-statement" element={isLoggedIn ? <Layout><VehicleExpenseTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/expensese-statement" element={isLoggedIn ? <Layout><ExpensesAccountStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/expensese-statement/statement" element={isLoggedIn ? <Layout><ExpenseseStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/full-account-statement" element={isLoggedIn ? <Layout><FullAccountStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/full-account-statement/statement" element={isLoggedIn ? <Layout><FullAccountStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/trader-statement" element={isLoggedIn ? <Layout><TraderStatementForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/trader-statement/statement" element={isLoggedIn ? <Layout><TraderStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/garage-statement" element={isLoggedIn ? <Layout><GarageStatementForm /></Layout> : <Navigate to="/login" />} /> 
      <Route path="/reports/garage-statement/statement" element={isLoggedIn ? <Layout><GarageStatementTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/ledger" element={isLoggedIn ? <Layout><LedgerForm /></Layout> : <Navigate to="/login" />} />
      <Route path="/reports/ledger/ledger-tables" element={isLoggedIn ? <Layout><LedgerTable /></Layout> :  <Navigate to="/login" />} />
      <Route path="/settings" element={isLoggedIn ? <Layout><Settings /></Layout> : <Navigate to="/login" />} />
      <Route path="/settings/black-list" element={isLoggedIn ? <Layout><BlackListTable /></Layout> : <Navigate to="/login" />} />
      <Route path="/settings/black-list/add-blacklist" element={isLoggedIn ? <Layout><AddBlackListForm /></Layout> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;