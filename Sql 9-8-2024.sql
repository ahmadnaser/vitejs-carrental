-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 09, 2024 at 10:43 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CarRentalSystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `BankChecks`
--

CREATE TABLE `BankChecks` (
  `check_number` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `bank_name` varchar(50) NOT NULL,
  `check_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Beneficiaries`
--

CREATE TABLE `Beneficiaries` (
  `beneficiarie_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact_info` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Beneficiaries`
--

INSERT INTO `Beneficiaries` (`beneficiarie_id`, `name`, `contact_info`, `type`) VALUES
(1, 'Mujahed Abuali', '908765', '132');

-- --------------------------------------------------------

--
-- Table structure for table `BlackListRenters`
--

CREATE TABLE `BlackListRenters` (
  `blacklist_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CompaniesMessages`
--

CREATE TABLE `CompaniesMessages` (
  `message_id` int(11) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime NOT NULL
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

INSERT INTO `ExpensesType` (`expense_type_id`, `type`, `type_info`) VALUES
(1, 'Diesel', ''),
(2, 'الايجار', ''),
(3, 'Maintenance ', '');

-- --------------------------------------------------------

--
-- Table structure for table `Feedback`
--

CREATE TABLE `Feedback` (
  `feedback_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `response` text DEFAULT NULL,
  `status` enum('open','closed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

INSERT INTO `Garages` (`garage_id`, `name`, `type`, `location`, `contact_info`, `garage_info`) VALUES
(1, 'Garage Inc.', 'Maintenance ', '123 Mechanic St, City, Country', 'garage@example.com', 'Car wash '),
(2, 'Auto Fix', 'Maintenance ', '456 Repair Rd, City, Country', 'autofix@example.com', 'Motor maintenance '),
(3, 'Al-Amir', 'Maintenance ', 'ramallah', '+97234235', 'lalala'),
(4, 'Ahmad have ', 'This ', 'This ', 'This ', 'This ');

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
  `amount_paid` decimal(10,2) NOT NULL,
  `trader_id` int(11) NOT NULL,
  `spare_parts` text NOT NULL,
  `spare_parts_price` decimal(10,2) NOT NULL,
  `amount_paid_of_spare_parts` decimal(10,2) NOT NULL,
  `garage_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Maintenance`
--

INSERT INTO `Maintenance` (`maintenance_id`, `vehicle_id`, `maintenance_date`, `details`, `cost`, `amount_paid`, `trader_id`, `spare_parts`, `spare_parts_price`, `amount_paid_of_spare_parts`, `garage_id`) VALUES
(435, '11312-H', '2024-08-21', 'efw', 123.00, 12.00, 1213, 'ewr', 123.00, 21.00, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `payment_id` int(11) NOT NULL,
  `reservation_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_method` enum('bank_check','cash') NOT NULL,
  `check_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`payment_id`, `reservation_id`, `amount`, `payment_date`, `payment_method`, `check_number`) VALUES
(43, 122, 100.00, '2024-08-03 11:45:59', 'cash', NULL),
(44, 123, 100.00, '2024-08-03 12:11:46', 'cash', NULL);

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
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Rentals`
--

INSERT INTO `Rentals` (`rental_id`, `reservation_id`, `start_date`, `end_date`, `car_mileage`, `car_condition`, `car_damage`, `note`) VALUES
(47, 122, '2024-07-25 09:00:00', '2024-07-25 09:00:00', '100', NULL, NULL, '10000km'),
(48, 123, '2024-08-14 09:00:00', '2024-09-03 09:00:00', '123km', NULL, NULL, '213');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL,
  `tenant_id` varchar(50) NOT NULL,
  `second_driver_id` varchar(50) DEFAULT NULL,
  `vehicle_id` varchar(50) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `price_perday` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','cancelled') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `tenant_id`, `second_driver_id`, `vehicle_id`, `start_date`, `end_date`, `price_perday`, `total_amount`, `amount_paid`, `status`) VALUES
(122, '4532', NULL, '2', '2024-07-25 09:00:00', '2024-07-25 09:00:00', 120.00, 100.00, 100.00, 'confirmed'),
(123, '19876543', NULL, '2', '2024-08-14 09:00:00', '2024-09-03 09:00:00', 100.00, 2000.00, 100.00, 'confirmed');

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

INSERT INTO `Tenants` (`id_number`, `tenant_name`, `address`, `phone_number`, `blood_type`, `birth_date`, `license_number`, `license_start_date`, `license_end_date`, `id_image_path`, `license_image_path`) VALUES
('19876543', 'Ahmed', 'zad', '123', 'A1', '2024-07-11', '12323', '2024-07-11', '2024-07-11', NULL, NULL),
('4532', 'halaaa', 'Ramallah', '432', 'B+', '2024-07-09', '908765432', '2024-07-16', '2024-07-10', NULL, NULL),
('453280976543', 'khalid', '32', '432', 'B+', '2024-07-24', '908765432', '2024-07-23', '2024-07-10', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tracking`
--

CREATE TABLE `tracking` (
  `tracking_id` int(11) NOT NULL,
  `vehicle_id` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

INSERT INTO `Traders` (`trader_id`, `name`, `contact_info`, `type`) VALUES
(1213, 'ahmad', '+771213123', 'قطع'),
(1214, 'khalid', '908765', 'This '),
(1224, ' ', '123', '132'),
(1226, 'Ahmed', '19876543', 'zad'),
(1227, 'fofof ', '243', 'ds'),
(1228, 'fofof ', '243', 'ds'),
(1229, 'fofof ', '243', 'ds'),
(1231, 'Mujahed Abuali', '123', 'This '),
(1232, 'Mujahed Abuali', '123', 'This '),
(1233, 'joj', '123', 'This '),
(1234, 'How ', 'This ', 'Maintenance ');

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
  `payment_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Transactions`
--

INSERT INTO `Transactions` (`transaction_id`, `date`, `description`, `debit`, `credit`, `payment_id`) VALUES
(1, '2024-08-03', 'Rental Payment - halaaa', 100.00, 0.00, 43),
(2, '2024-08-03', 'Rental Payment - halaaa', 0.00, 100.00, 43),
(3, '2024-08-03', 'Rental Payment - Ahmed', 2000.00, 0.00, 44),
(4, '2024-08-03', 'Rental Payment - Ahmed', 0.00, 100.00, 44);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
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

INSERT INTO `Users` (`user_id`, `name`, `email`, `password`, `phone`, `address`, `role`) VALUES
(1, 'Mujahed', 'mujahed@gmail.com', 'password123', '1234567890', '123 Main St, City, Country', 'customer'),
(2, 'Abuali', 'abuali@gmail.com', 'password123', '0987654321', '456 Elm St, City, Country', 'administrator');

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
  `rental_rate` decimal(10,2) DEFAULT NULL,
  `status` enum('available','rented','maintenance') NOT NULL,
  `mileage` varchar(55) DEFAULT NULL,
  `last_oil_change_miles` varchar(50) NOT NULL,
  `last_oil_change_date` date NOT NULL,
  `license_expiry_date` date NOT NULL,
  `insurance_expiry_date` date NOT NULL,
  `change_oil_every_km` varchar(50) NOT NULL,
  `change_oil_every_month` varchar(50) NOT NULL,
  `license_image` varchar(255) DEFAULT NULL,
  `insurance_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Vehicles`
--

INSERT INTO `Vehicles` (`vehicle_id`, `make`, `model`, `year`, `color`, `rental_rate`, `status`, `mileage`, `last_oil_change_miles`, `last_oil_change_date`, `license_expiry_date`, `insurance_expiry_date`, `change_oil_every_km`, `change_oil_every_month`, `license_image`, `insurance_image`) VALUES
('11312-H', 'Toyota', 'Corolla', 2020, 'red', 45.00, 'available', '15000', '1000', '2024-07-29', '2024-07-02', '2024-07-02', '1000', '6', '', ''),
('2', 'Honda', 'Civic', 2019, 'white', 40.00, 'available', '25000', '123112', '2024-06-04', '2024-07-02', '2024-07-02', '1000', '6', '', ''),
('3', 'Ford', 'Escape', 2021, 'black', 60.00, 'available', '10000', '11122', '2024-07-29', '2024-07-02', '2024-07-02', '1000', '6', '', ''),
('4', 'Chevrolet', 'Tahoe', 2020, 'red', 80.00, 'maintenance', '20000', '123100', '2024-07-02', '2024-07-02', '2024-07-02', '1000', '6', '', ''),
('765432-H', 'BMW', 'm1', 2022, '2024-07-25T12:00', NULL, 'maintenance', NULL, '120', '2024-07-25', '2024-07-25', '2024-07-25', '10000km', '4', NULL, NULL),
('Skoda', 'Skoda', 'Octavia', 2022, 'Red', NULL, 'available', '120', '0KM', '2024-08-21', '2024-08-14', '2024-08-20', '10000KM', '6', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BankChecks`
--
ALTER TABLE `BankChecks`
  ADD PRIMARY KEY (`check_number`);

--
-- Indexes for table `Beneficiaries`
--
ALTER TABLE `Beneficiaries`
  ADD PRIMARY KEY (`beneficiarie_id`);

--
-- Indexes for table `BlackListRenters`
--
ALTER TABLE `BlackListRenters`
  ADD PRIMARY KEY (`blacklist_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `CompaniesMessages`
--
ALTER TABLE `CompaniesMessages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `ExpensesType`
--
ALTER TABLE `ExpensesType`
  ADD PRIMARY KEY (`expense_type_id`);

--
-- Indexes for table `Feedback`
--
ALTER TABLE `Feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Garages`
--
ALTER TABLE `Garages`
  ADD PRIMARY KEY (`garage_id`);

--
-- Indexes for table `Maintenance`
--
ALTER TABLE `Maintenance`
  ADD PRIMARY KEY (`maintenance_id`),
  ADD KEY `vehicle_maintenance_ibfk_1` (`vehicle_id`),
  ADD KEY `fk_garage_id` (`garage_id`),
  ADD KEY `fk_trader_id` (`trader_id`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_check_number` (`check_number`),
  ADD KEY `fk_reservation_id` (`reservation_id`);

--
-- Indexes for table `Rentals`
--
ALTER TABLE `Rentals`
  ADD PRIMARY KEY (`rental_id`),
  ADD KEY `reservation_id` (`reservation_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `reservations_ibfk_2` (`vehicle_id`),
  ADD KEY `reservations_ibfk_1` (`tenant_id`),
  ADD KEY `reservations_ibfk_3` (`second_driver_id`);

--
-- Indexes for table `Tenants`
--
ALTER TABLE `Tenants`
  ADD PRIMARY KEY (`id_number`);

--
-- Indexes for table `tracking`
--
ALTER TABLE `tracking`
  ADD PRIMARY KEY (`tracking_id`),
  ADD KEY `tracking_ibfk_1` (`vehicle_id`);

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
  ADD KEY `fk_payment` (`payment_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Vehicles`
--
ALTER TABLE `Vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Beneficiaries`
--
ALTER TABLE `Beneficiaries`
  MODIFY `beneficiarie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `BlackListRenters`
--
ALTER TABLE `BlackListRenters`
  MODIFY `blacklist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `CompaniesMessages`
--
ALTER TABLE `CompaniesMessages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ExpensesType`
--
ALTER TABLE `ExpensesType`
  MODIFY `expense_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Feedback`
--
ALTER TABLE `Feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Garages`
--
ALTER TABLE `Garages`
  MODIFY `garage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Maintenance`
--
ALTER TABLE `Maintenance`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=436;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `Rentals`
--
ALTER TABLE `Rentals`
  MODIFY `rental_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `tracking`
--
ALTER TABLE `tracking`
  MODIFY `tracking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Traders`
--
ALTER TABLE `Traders`
  MODIFY `trader_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1238;

--
-- AUTO_INCREMENT for table `Transactions`
--
ALTER TABLE `Transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BlackListRenters`
--
ALTER TABLE `BlackListRenters`
  ADD CONSTRAINT `blacklistrenters_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Feedback`
--
ALTER TABLE `Feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Maintenance`
--
ALTER TABLE `Maintenance`
  ADD CONSTRAINT `fk_garage_id` FOREIGN KEY (`garage_id`) REFERENCES `Garages` (`garage_id`),
  ADD CONSTRAINT `fk_trader_id` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`trader_id`),
  ADD CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`vehicle_id`) ON DELETE CASCADE;

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `fk_check_number` FOREIGN KEY (`check_number`) REFERENCES `BankChecks` (`check_number`),
  ADD CONSTRAINT `fk_reservation_id` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`) ON DELETE SET NULL;

--
-- Constraints for table `Rentals`
--
ALTER TABLE `Rentals`
  ADD CONSTRAINT `rentals_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `Reservations` (`reservation_id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `Tenants` (`id_number`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`vehicle_id`),
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`second_driver_id`) REFERENCES `Tenants` (`id_number`);

--
-- Constraints for table `tracking`
--
ALTER TABLE `tracking`
  ADD CONSTRAINT `tracking_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`vehicle_id`) ON DELETE NO ACTION;

--
-- Constraints for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD CONSTRAINT `fk_payment` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`payment_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
