-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: sdb-65.hosting.stackcp.net
-- Generation Time: Aug 21, 2024 at 04:06 PM
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

INSERT INTO `BankChecks` (`check_id`, `check_number`, `account_number`, `check_holder`, `bank_name`, `check_date`, `check_image`) VALUES
(15, '5423412', '45352', 'Ù…Ø¬Ø§Ù‡Ø¯ Ø§Ø¨ÙˆØ¹Ù„ÙŠ', 'ÙÙ„Ø³Ø·ÙŠÙ†', '2024-09-07', 'check_uploads/Palestinian Check.jpg');

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
(3, 'Ù…Ø¬Ø§Ù‡Ø¯ Ø§Ø¨ÙˆØ¹Ù„ÙŠ', '0598109016', 'Ø¯Ø¹Ø§ÙŠØ©'),
(4, 'Ø§Ø­Ù…Ø¯ Ù…Ø­Ù…Ø¯ ', '0598209026', 'ØµÙŠØ§Ù†Ø© Ø§Ù„Ø³ÙŠØ³ØªÙ…');

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

--
-- Dumping data for table `Expenses`
--

INSERT INTO `Expenses` (`expenses_id`, `expense_type_id`, `expenses_amount`, `expenses_date`, `detail`, `check_id`) VALUES
(14, 5, '200.00', '2024-08-21', 'Ø¨Ù†Ø²ÙŠÙ†', NULL),
(15, 6, '100.00', '2024-08-21', 'ØªØ¬Ø¯ÙŠØ¯ ØªØ±Ø®ÙŠØµ ', NULL),
(16, NULL, '500.00', '2024-08-21', 'ØµÙŠØ§Ù†Ø© Ø§Ù„ØµØ¨Ø§Ø¨Ø§Øª', 15),
(17, NULL, '200.00', '2024-08-21', 'ØµØ¨Ø§Ø¨Ø§Øª', NULL);

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
(5, 'ÙˆÙ‚ÙˆØ¯', 'Ø¨Ù†Ø²ÙŠÙ† ÙˆØ³ÙˆÙ„Ø§Ø± Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª'),
(6, 'ØªØ±Ø®ÙŠØµ', 'ØªØ¬Ø¯ÙŠØ¯ ØªØ±Ø®ÙŠØµ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª'),
(7, 'ØªØ§Ù…ÙŠÙ†', 'ØªØ¬Ø¯ÙŠØ¯ ØªØ§Ù…ÙŠÙ† Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª');

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
(7, 'ÙƒØ±Ø§Ø¬ Ù‚Ø·Ø± ', 'ØµÙŠØ§Ù†Ø©', 'Ø±Ø§Ù… Ø§Ù„Ù„Ù‡', '0598787230', 'ØµÙŠØ§Ù†Ø© Ø§Ù„Ù…Ø­Ø±Ùƒ'),
(8, 'ÙƒØ±Ø§Ø¬ Ø§Ù„Ø¨ÙŠØ±Ø©', 'ØµÙŠØ§Ù†Ø©', 'Ø§Ù„Ø¨ÙŠØ±Ø©', '0596687239', 'ØªØµÙ„ÙŠØ­ Ø¨ÙˆØ¯ÙŠ ÙˆØ¯Ù‡Ø§Ù†'),
(9, 'Ù…ØºØ³Ù„Ø© Ø§Ù„ÙƒØ±Ù…', 'Ù…ØºØ³Ù„Ø©', 'Ø³Ù„ÙˆØ§Ø¯', '0566623709', 'Ù…ØºØ³Ù„Ø© Ø³ÙŠØ§Ø±Ø§Øª ');

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
(36, '100.00', '100.00', '100.00'),
(37, '80.00', '80.00', '20.00');

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

--
-- Dumping data for table `Maintenance`
--

INSERT INTO `Maintenance` (`maintenance_id`, `vehicle_id`, `maintenance_date`, `details`, `cost`, `trader_id`, `spare_parts`, `spare_parts_price`, `car_mileage`, `garage_id`, `garage_expensese_id`, `spare_part_expensese_id`) VALUES
(439, '60543-H', '2024-08-21', 'ØµÙŠØ§Ù†Ø© Ø§Ù„ØµØ¨Ø§Ø¨Ø§Øª', '600.00', 1239, 'ØµØ¨Ø§Ø¨Ø§Øª', '200.00', '', 7, 16, 17);

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
(157, '100.00', '2024-08-20 19:48:25', 'cash', NULL, 36),
(158, '20.00', '2024-08-20 20:57:00', 'cash', NULL, 37);

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
(154, 242, '2024-08-22 11:00:00', '2024-08-23 11:00:00', '123km', NULL, NULL, 'Ø¬Ø§Ù‡Ø²'),
(155, 243, '2024-09-07 11:00:00', '2024-09-08 11:00:00', '22000', NULL, NULL, 'Ø¬Ø§Ù‡Ø²');

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

INSERT INTO `Reservations` (`reservation_id`, `tenant_id`, `second_driver_id`, `vehicle_id`, `invoice_id`, `start_date`, `end_date`, `status`) VALUES
(242, '453221', NULL, '1234-H', 36, '2024-08-22 11:00:00', '2024-08-23 11:00:00', 'confirmed'),
(243, '875433', NULL, '1234-H', 37, '2024-09-07 11:00:00', '2024-09-08 11:00:00', 'confirmed');

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
('453221', 'Ø§Ø­Ù…Ø¯ Ù†Ø§ØµØ±', 'Ø³Ù„ÙˆØ§Ø¯', '0598324234', 'B-', '2000-08-18', '908765432', '2024-08-14', '2024-08-20', 'id_uploads/id_453221e_868.jpg', 'license_uploads/license_453221e_409.jpg'),
('53421120', 'Ø®Ø§Ù„Ø¯ Ø±Ø§Ù…ÙŠ', 'Ù…Ø®Ù…Ø§Ø³', '059810213', 'AB+', '2003-08-16', '9023121213', '2024-07-31', '2024-09-07', 'id_uploads/id_53421120_745.jpg', 'license_uploads/license_53421120_570.jpg'),
('875433', 'Rashwi', 'Ø±Ø§Ù… Ø§Ù„Ù„Ù‡', 'Ù¡Ù¦Ù¤Ù¦Ù¤Ù¦', 'O+', '2001-08-20', '1929292', '2024-08-03', '2024-08-17', 'id_uploads/id_875433_768.jpeg', 'license_uploads/license_875433_990.jpeg'),
('8764532', 'Ù…Ø¬Ø§Ù‡Ø¯ Ø§Ø¨ÙˆØ¹Ù„ÙŠ', 'Ramallah', '0598109016', 'A-', '2024-07-28', '908765432', '2024-07-31', '2024-09-06', 'id_uploads/id_8764532_365.jpg', 'license_uploads/license_8764532_147.jpg');

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
(1239, 'Ø®Ø§Ù„Ø¯ Ù…ØµØ·ÙÙ‰', '0598899231', 'ØªØ§Ø¬Ø± Ù‚Ø·Ø¹ Ø§Ù„Ù…Ø­Ø±Ùƒ '),
(1240, 'Â Ø§ÙŠÙ…Ù† Ù…Ø³Ù„Ù… ', '0567789780', 'ØªØ§Ø¬Ø± Ø§Ø·Ø§Ø±Ø§Øª');

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

INSERT INTO `Transactions` (`transaction_id`, `date`, `description`, `debit`, `credit`, `payment_id`, `expensese_id`) VALUES
(227, '2024-08-20', 'Ø§Ù„Ù…Ø·Ù„ÙˆØ¨ Ù…Ù‚Ø§Ø¨Ù„ Ø¹Ù‚Ø¯ Ø§Ù„Ø§ÙŠØ¬Ø§Ø±', '100.00', '0.00', 157, NULL),
(228, '2024-08-20', 'Ø¯ÙØ¹Ø© Ù…Ø§Ù„ÙŠØ© - Ø§Ø­Ù…Ø¯ Ù†Ø§ØµØ±', '0.00', '100.00', 157, NULL),
(229, '2024-08-20', 'Ø§Ù„Ù…Ø·Ù„ÙˆØ¨ Ù…Ù‚Ø§Ø¨Ù„ Ø¹Ù‚Ø¯ Ø§Ù„Ø§ÙŠØ¬Ø§Ø±', '80.00', '0.00', 158, NULL),
(230, '2024-08-20', 'Ø¯ÙØ¹Ø© Ù…Ø§Ù„ÙŠØ© - Rashwi', '0.00', '20.00', 158, NULL),
(231, '2024-08-21', 'Ù…ØµØ±ÙˆÙ ØµÙŠØ§Ù†Ø© - ÙƒØ±Ø§Ø¬ Ù‚Ø·Ø± ', '600.00', '0.00', NULL, 16),
(232, '2024-08-21', 'Ø¯ÙØ¹ Ù…ØµØ±ÙˆÙ ØµÙŠØ§Ù†Ø© - ÙƒØ±Ø§Ø¬ Ù‚Ø·Ø± ', '0.00', '500.00', NULL, 16),
(233, '2024-08-21', 'Ù…ØµØ±ÙˆÙ Ù‚Ø·Ø¹ ØºÙŠØ§Ø± - 1239', '200.00', '0.00', NULL, 17),
(234, '2024-08-21', 'Ø¯ÙØ¹ Ù…ØµØ±ÙˆÙ Ù‚Ø·Ø¹ ØºÙŠØ§Ø± - 1239', '0.00', '200.00', NULL, 17);

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
(1, 'Ahmad', 'ahmad@gmail.com', '$2y$10$rSIwkJJfHrM1wFXosDzz6.F01cDUBNe07..UqK9hLurnlxmsnDojG', '1234567890', 'Ramallah', 'administrator'),
(2, 'Mujahed', 'abuali@gmail.com', '$2y$10$rSIwkJJfHrM1wFXosDzz6.F01cDUBNe07..UqK9hLurnlxmsnDojG', '0987654321', 'Ramallah', 'administrator'),
(123, 'Rasha', 'rasha@gmail.com', '$2y$10$rSIwkJJfHrM1wFXosDzz6.F01cDUBNe07..UqK9hLurnlxmsnDojG', '12112212121', 'Ramallah', 'administrator');

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
  `change_oil_every_km` varchar(50) NOT NULL,
  `change_oil_every_month` varchar(50) NOT NULL,
  `license_image` varchar(255) DEFAULT NULL,
  `insurance_image` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Vehicles`
--

INSERT INTO `Vehicles` (`vehicle_id`, `make`, `model`, `year`, `color`, `status`, `mileage`, `last_oil_change_miles`, `last_oil_change_date`, `license_expiry_date`, `insurance_expiry_date`, `change_oil_every_km`, `change_oil_every_month`, `license_image`, `insurance_image`, `active`) VALUES
('1234-H', 'Ø³ÙƒÙˆØ¯Ø§ ', 'Ø§ÙƒØªØ§ÙÙŠØ§', 2022, 'Ø§Ø³ÙˆØ¯', 'available', '20000', '1000', '2024-08-01', '2024-08-31', '2024-08-31', '1000', '6', 'car_license_uploads/IMG_1044.jpeg', 'car_insurance_uploads/IMG_1045.jpeg', 1),
('60543-H', 'Ø´ÙŠÙØ±ÙˆÙ„ÙŠØª', 'Ø³Ø¨Ø§Ø±Ùƒ', 2021, 'Ø§Ø­Ù…Ø±', 'available', '265509', '189000', '2024-07-31', '2024-09-06', '2024-09-06', '10000', '6', 'car_license_uploads/Palestinian vehicle insurance.jpg', 'car_insurance_uploads/Palestinian Check.jpg', 1),
('69870-H', 'ÙÙˆØ±Ø¯', 'ÙÙˆÙƒØ³', 2018, 'Ø§Ø¨ÙŠØ¶', 'available', '200000', '15000', '2021-08-06', '2024-08-31', '2024-09-07', '5000', '6', 'car_license_uploads/Palestinian vehicle license.jpeg', 'car_insurance_uploads/Palestinian vehicle insurance.jpg', 1);

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
  ADD PRIMARY KEY (`beneficiarie_id`);

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
-- AUTO_INCREMENT for table `BankChecks`
--
ALTER TABLE `BankChecks`
  MODIFY `check_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Beneficiaries`
--
ALTER TABLE `Beneficiaries`
  MODIFY `beneficiarie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `Invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `Maintenance`
--
ALTER TABLE `Maintenance`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=440;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `Rentals`
--
ALTER TABLE `Rentals`
  MODIFY `rental_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `Reservations`
--
ALTER TABLE `Reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT for table `Traders`
--
ALTER TABLE `Traders`
  MODIFY `trader_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1241;

--
-- AUTO_INCREMENT for table `Transactions`
--
ALTER TABLE `Transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
