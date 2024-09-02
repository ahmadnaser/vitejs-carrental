-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: sdb-65.hosting.stackcp.net
-- Generation Time: Sep 02, 2024 at 09:55 AM
-- Server version: 10.6.18-MariaDB-log
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CarRentalSystem-35303339cfc4`
--

-- --------------------------------------------------------

--
-- Table structure for table `BankChecks`
--

CREATE TABLE `BankChecks` (
  `check_id` int(11) NOT NULL,
  `check_number` varchar(50) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `check_holder` varchar(50) NOT NULL,
  `bank_name` varchar(50) NOT NULL,
  `check_date` date NOT NULL,
  `check_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BankChecks`
--


-- --------------------------------------------------------

--
-- Table structure for table `Beneficiaries`
--

CREATE TABLE `Beneficiaries` (
  `beneficiary_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact_info` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Beneficiaries`
--


-- --------------------------------------------------------

--
-- Table structure for table `BlackList`
--

CREATE TABLE `BlackList` (
  `black_list_id` int(11) NOT NULL,
  `id_number` varchar(50) NOT NULL,
  `company` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Config`
--

CREATE TABLE `Config` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Config`
--

INSERT INTO `Config` (`id`, `code`) VALUES
(1, 'SHhd8dVS4xP2tCeX6c5/4g==');

-- --------------------------------------------------------

--
-- Table structure for table `Expenses`
--

CREATE TABLE `Expenses` (
  `expenses_id` int(11) NOT NULL,
  `expense_type_id` int(11) DEFAULT NULL,
  `expenses_amount` decimal(10,2) NOT NULL,
  `expenses_date` date NOT NULL,
  `detail` text NOT NULL,
  `check_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ExpensesType`
--

CREATE TABLE `ExpensesType` (
  `expense_type_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `type_info` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ExpensesType`
--


-- --------------------------------------------------------

--
-- Table structure for table `Garages`
--

CREATE TABLE `Garages` (
  `garage_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `contact_info` varchar(100) DEFAULT NULL,
  `garage_info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Garages`
--


-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `Invoice_id` int(11) NOT NULL,
  `price_perday` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Invoices`
--

INSERT INTO `Invoices` (`Invoice_id`, `price_perday`, `total_amount`, `amount_paid`) VALUES
(41, '100.00', '400.00', '300.00');

-- --------------------------------------------------------

--
-- Table structure for table `Maintenance`
--

CREATE TABLE `Maintenance` (
  `maintenance_id` int(11) NOT NULL,
  `vehicle_id` varchar(50) NOT NULL,
  `maintenance_date` date NOT NULL,
  `details` text NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `trader_id` int(11) NOT NULL,
  `spare_parts` text NOT NULL,
  `spare_parts_price` decimal(10,2) NOT NULL,
  `car_mileage` varchar(50) DEFAULT NULL,
  `garage_id` int(11) DEFAULT NULL,
  `garage_expensese_id` int(11) NOT NULL,
  `spare_part_expensese_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `payment_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_method` enum('bank_check','cash') NOT NULL,
  `check_id` int(11) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`payment_id`, `amount`, `payment_date`, `payment_method`, `check_id`, `invoice_id`) VALUES
(164, '300.00', '2024-09-02 08:51:04', '', 18, 41);

-- --------------------------------------------------------

--
-- Table structure for table `Rentals`
--

CREATE TABLE `Rentals` (
  `rental_id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `car_mileage` varchar(255) NOT NULL,
  `car_condition` varchar(255) DEFAULT NULL,
  `car_damage` varchar(255) DEFAULT NULL,
  `note` text NOT NULL,
  `has_return` tinyint(4) NOT NULL DEFAULT 0,
  `return_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Rentals`
--

-- --------------------------------------------------------

--
-- Table structure for table `Reservations`
--

CREATE TABLE `Reservations` (
  `reservation_id` int(11) NOT NULL,
  `tenant_id` varchar(50) NOT NULL,
  `second_driver_id` varchar(50) DEFAULT NULL,
  `vehicle_id` varchar(50) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','confirmed','cancelled') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reservations`
--


-- --------------------------------------------------------

--
-- Table structure for table `Tenants`
--

CREATE TABLE `Tenants` (
  `id_number` varchar(255) NOT NULL,
  `tenant_name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `blood_type` varchar(10) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `license_start_date` date DEFAULT NULL,
  `license_end_date` date DEFAULT NULL,
  `id_image_path` varchar(255) DEFAULT NULL,
  `license_image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Tenants`
--



-- --------------------------------------------------------

--
-- Table structure for table `Traders`
--

CREATE TABLE `Traders` (
  `trader_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact_info` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Traders`
--


-- --------------------------------------------------------

--
-- Table structure for table `Transactions`
--

CREATE TABLE `Transactions` (
  `transaction_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `debit` decimal(10,2) NOT NULL,
  `credit` decimal(10,2) NOT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `expensese_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Transactions`
--


-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `role` enum('customer','administrator','support') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`name`, `email`, `password`, `phone`, `address`, `role`) VALUES
('Mujahed', 'abuali@gmail.com', '$2y$10$rSIwkJJfHrM1wFXosDzz6.F01cDUBNe07..UqK9hLurnlxmsnDojG', '0987654321', 'Ramallah', 'administrator'),
('Ahmad', 'ahmad@gmail.com', '$2y$10$rSIwkJJfHrM1wFXosDzz6.F01cDUBNe07..UqK9hLurnlxmsnDojG', '1234567890', 'Ramallah', 'administrator'),
('Rasha', 'rasha@gmail.com', '$2y$10$rSIwkJJfHrM1wFXosDzz6.F01cDUBNe07..UqK9hLurnlxmsnDojG', '12112212121', 'Ramallah', 'administrator');

-- --------------------------------------------------------

--
-- Table structure for table `Vehicles`
--

CREATE TABLE `Vehicles` (
  `vehicle_id` varchar(50) NOT NULL,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `year` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `status` enum('available','rented','maintenance') NOT NULL,
  `mileage` varchar(55) DEFAULT NULL,
  `last_oil_change_miles` varchar(50) NOT NULL,
  `last_oil_change_date` date NOT NULL,
  `license_expiry_date` date NOT NULL,
  `insurance_expiry_date` date NOT NULL,
  `license_start_date` date NOT NULL,
  `insurance_start_date` date NOT NULL,
  `change_oil_every_km` varchar(50) NOT NULL,
  `change_oil_every_month` varchar(50) NOT NULL,
  `license_image` varchar(255) DEFAULT NULL,
  `insurance_image` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Vehicles`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `BankChecks`
--
ALTER TABLE `BankChecks`
  ADD PRIMARY KEY (`check_id`);

--
-- Indexes for table `Beneficiaries`
--
ALTER TABLE `Beneficiaries`
  ADD PRIMARY KEY (`beneficiary_id`);

--
-- Indexes for table `BlackList`
--
ALTER TABLE `BlackList`
  ADD PRIMARY KEY (`black_list_id`);

--
-- Indexes for table `Config`
--
ALTER TABLE `Config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Expenses`
--
ALTER TABLE `Expenses`
  ADD PRIMARY KEY (`expenses_id`),
  ADD KEY `expense_type_id` (`expense_type_id`);

--
-- Indexes for table `ExpensesType`
--
ALTER TABLE `ExpensesType`
  ADD PRIMARY KEY (`expense_type_id`);

--
-- Indexes for table `Garages`
--
ALTER TABLE `Garages`
  ADD PRIMARY KEY (`garage_id`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`Invoice_id`);

--
-- Indexes for table `Maintenance`
--
ALTER TABLE `Maintenance`
  ADD PRIMARY KEY (`maintenance_id`),
  ADD KEY `vehicle_maintenance_ibfk_1` (`vehicle_id`),
  ADD KEY `fk_garage_id` (`garage_id`),
  ADD KEY `fk_trader_id` (`trader_id`),
  ADD KEY `expensese_id` (`garage_expensese_id`),
  ADD KEY `spare_part_expensese_id` (`spare_part_expensese_id`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `Rentals`
--
ALTER TABLE `Rentals`
  ADD PRIMARY KEY (`rental_id`),
  ADD KEY `reservation_id` (`reservation_id`);

--
-- Indexes for table `Reservations`
--
ALTER TABLE `Reservations`
  ADD PRIMARY KEY (`reservation_id`);

--
-- Indexes for table `Tenants`
--
ALTER TABLE `Tenants`
  ADD PRIMARY KEY (`id_number`);

--
-- Indexes for table `Traders`
--
ALTER TABLE `Traders`
  ADD PRIMARY KEY (`trader_id`);

--
-- Indexes for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `Vehicles`
--
ALTER TABLE `Vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BankChecks`
--
ALTER TABLE `BankChecks`
  MODIFY `check_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Beneficiaries`
--
ALTER TABLE `Beneficiaries`
  MODIFY `beneficiary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `BlackList`
--
ALTER TABLE `BlackList`
  MODIFY `black_list_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Config`
--
ALTER TABLE `Config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Expenses`
--
ALTER TABLE `Expenses`
  MODIFY `expenses_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `ExpensesType`
--
ALTER TABLE `ExpensesType`
  MODIFY `expense_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Garages`
--
ALTER TABLE `Garages`
  MODIFY `garage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Invoices`
--
ALTER TABLE `Invoices`
  MODIFY `Invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `Maintenance`
--
ALTER TABLE `Maintenance`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=440;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `Rentals`
--
ALTER TABLE `Rentals`
  MODIFY `rental_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `Reservations`
--
ALTER TABLE `Reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

--
-- AUTO_INCREMENT for table `Traders`
--
ALTER TABLE `Traders`
  MODIFY `trader_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1241;

--
-- AUTO_INCREMENT for table `Transactions`
--
ALTER TABLE `Transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
