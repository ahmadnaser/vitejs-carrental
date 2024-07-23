-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 19, 2024 at 08:41 PM
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
-- Table structure for table `BlackListRenters`
--

CREATE TABLE `BlackListRenters` (
  `blacklist_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BlackListRenters`
--

INSERT INTO `BlackListRenters` (`blacklist_id`, `user_id`, `reason`, `date`) VALUES
(1, 1, 'Repeated late returns and damage to vehicles', '2024-07-01');

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

--
-- Dumping data for table `CompaniesMessages`
--

INSERT INTO `CompaniesMessages` (`message_id`, `company_name`, `message`, `timestamp`) VALUES
(1, 'Insurance Co.', 'Monthly insurance invoice due', '2024-07-01 09:00:00'),
(2, 'Local Police', 'Traffic violation report', '2024-07-01 14:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Expenses`
--

CREATE TABLE `Expenses` (
  `expense_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `description` text DEFAULT NULL,
  `beneficiary` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Expenses`
--

INSERT INTO `Expenses` (`expense_id`, `type`, `amount`, `date`, `description`, `beneficiary`) VALUES
(1, 'Maintenance', 400.00, '2024-06-30', 'Monthly vehicle maintenance', 'Garage Inc.'),
(2, 'Fuel', 150.00, '2024-06-28', 'Fuel expenses for rental vehicles', 'Local Gas Station');

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

--
-- Dumping data for table `Feedback`
--

INSERT INTO `Feedback` (`feedback_id`, `user_id`, `message`, `response`, `status`) VALUES
(1, 1, 'Great service, will rent again!', 'Thank you for your feedback!', 'closed'),
(2, 1, 'The car had a minor issue with the AC.', 'We apologize for the inconvenience and will look into it.', 'closed');

-- --------------------------------------------------------

--
-- Table structure for table `Garages`
--

CREATE TABLE `Garages` (
  `garage_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `contact_info` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Garages`
--

INSERT INTO `Garages` (`garage_id`, `name`, `location`, `contact_info`) VALUES
(1, 'Garage Inc.', '123 Mechanic St, City, Country', 'garage@example.com'),
(2, 'Auto Fix', '456 Repair Rd, City, Country', 'autofix@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `payment_id` int(11) NOT NULL,
  `rental_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_method` enum('credit_card','online_wallet','cash') NOT NULL,
  `status` enum('successful','failed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`payment_id`, `rental_id`, `amount`, `payment_date`, `payment_method`, `status`) VALUES
(1, 1, 315.00, '2024-07-01', 'credit_card', 'successful'),
(2, 2, 200.00, '2024-07-10', 'online_wallet', 'successful');

-- --------------------------------------------------------

--
-- Table structure for table `Rentals`
--

CREATE TABLE `Rentals` (
  `rental_id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_status` enum('paid','unpaid') NOT NULL,
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Rentals`
--

INSERT INTO `Rentals` (`rental_id`, `reservation_id`, `start_date`, `end_date`, `total_amount`, `payment_status`, `note`) VALUES
(1, 1, '2024-07-01', '2024-07-07', 315.00, 'paid', 'جاهز'),
(2, 2, '2024-07-10', '2024-07-15', 200.00, 'unpaid', 'جيد');

-- --------------------------------------------------------

--
-- Table structure for table `Reports`
--

CREATE TABLE `Reports` (
  `report_id` int(11) NOT NULL,
  `report_type` varchar(100) NOT NULL,
  `generated_date` date NOT NULL,
  `details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reports`
--

INSERT INTO `Reports` (`report_id`, `report_type`, `generated_date`, `details`) VALUES
(1, 'Revenue Report', '2024-07-01', 'Total revenue for June 2024: $5000.00'),
(2, 'Maintenance Report', '2024-07-01', 'Total maintenance costs for June 2024: $400.00');

-- --------------------------------------------------------

--
-- Table structure for table `Reservations`
--

CREATE TABLE `Reservations` (
  `reservation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price_perday` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','cancelled') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reservations`
--

INSERT INTO `Reservations` (`reservation_id`, `user_id`, `vehicle_id`, `start_date`, `end_date`, `price_perday`, `status`) VALUES
(1, 1, 1, '2024-07-01', '2024-07-07', 100.00, 'confirmed'),
(2, 1, 2, '2024-07-10', '2024-07-15', 100.00, 'pending'),
(3, 1, 3, '2024-08-01', '2024-08-05', 100.00, 'cancelled');

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
('1', 'q', 'zad', '123', 'A1', '2024-07-11', '12323', '2024-07-11', '2024-07-11', NULL, NULL),
('12342342١٢١', 'احمد', 'رام الله ', '2354', 'A-', '2024-07-29', '7865432', '2024-07-01', '2024-08-26', 'id_uploads/id_669a211b31f7f.jpeg', 'license_uploads/license_669a211b32166.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Tracking`
--

CREATE TABLE `Tracking` (
  `tracking_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Tracking`
--

INSERT INTO `Tracking` (`tracking_id`, `vehicle_id`, `location`, `timestamp`) VALUES
(1, 1, 'City Center, City, Country', '2024-07-01 10:00:00'),
(2, 3, 'Airport, City, Country', '2024-07-01 12:00:00');

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
(1, 'Parts Supplier', 'parts@example.com', 'Parts'),
(2, 'Service Provider', 'service@example.com', 'Service');

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
  `vehicle_id` int(11) NOT NULL,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `year` year(4) NOT NULL,
  `rental_rate` decimal(10,2) NOT NULL,
  `status` enum('available','rented','maintenance') NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Vehicles`
--

INSERT INTO `Vehicles` (`vehicle_id`, `make`, `model`, `year`, `rental_rate`, `status`, `category`, `mileage`) VALUES
(1, 'Toyota', 'Corolla', '2020', 45.00, 'available', 'sedan', 15000),
(2, 'Honda', 'Civic', '2019', 40.00, 'maintenance', 'sedan', 25000),
(3, 'Ford', 'Escape', '2021', 60.00, 'rented', 'SUV', 10000),
(4, 'Chevrolet', 'Tahoe', '2020', 80.00, 'available', 'SUV', 20000);

-- --------------------------------------------------------

--
-- Table structure for table `Vehicle_Maintenance`
--

CREATE TABLE `Vehicle_Maintenance` (
  `maintenance_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `maintenance_date` date NOT NULL,
  `details` text NOT NULL,
  `cost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Vehicle_Maintenance`
--

INSERT INTO `Vehicle_Maintenance` (`maintenance_id`, `vehicle_id`, `maintenance_date`, `details`, `cost`) VALUES
(1, 2, '2024-06-15', 'Oil change and tire rotation', 100.00),
(2, 3, '2024-06-20', 'Brake inspection and replacement', 300.00);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `Expenses`
--
ALTER TABLE `Expenses`
  ADD PRIMARY KEY (`expense_id`);

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
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `rental_id` (`rental_id`);

--
-- Indexes for table `Rentals`
--
ALTER TABLE `Rentals`
  ADD PRIMARY KEY (`rental_id`),
  ADD KEY `reservation_id` (`reservation_id`);

--
-- Indexes for table `Reports`
--
ALTER TABLE `Reports`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `Reservations`
--
ALTER TABLE `Reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `Tenants`
--
ALTER TABLE `Tenants`
  ADD PRIMARY KEY (`id_number`);

--
-- Indexes for table `Tracking`
--
ALTER TABLE `Tracking`
  ADD PRIMARY KEY (`tracking_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `Traders`
--
ALTER TABLE `Traders`
  ADD PRIMARY KEY (`trader_id`);

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
-- Indexes for table `Vehicle_Maintenance`
--
ALTER TABLE `Vehicle_Maintenance`
  ADD PRIMARY KEY (`maintenance_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

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
-- AUTO_INCREMENT for table `Expenses`
--
ALTER TABLE `Expenses`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Feedback`
--
ALTER TABLE `Feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Garages`
--
ALTER TABLE `Garages`
  MODIFY `garage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Rentals`
--
ALTER TABLE `Rentals`
  MODIFY `rental_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Reports`
--
ALTER TABLE `Reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Reservations`
--
ALTER TABLE `Reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Tracking`
--
ALTER TABLE `Tracking`
  MODIFY `tracking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Traders`
--
ALTER TABLE `Traders`
  MODIFY `trader_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Vehicles`
--
ALTER TABLE `Vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Vehicle_Maintenance`
--
ALTER TABLE `Vehicle_Maintenance`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`rental_id`) REFERENCES `Rentals` (`rental_id`);

--
-- Constraints for table `Rentals`
--
ALTER TABLE `Rentals`
  ADD CONSTRAINT `rentals_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `Reservations` (`reservation_id`);

--
-- Constraints for table `Reservations`
--
ALTER TABLE `Reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`vehicle_id`);

--
-- Constraints for table `Tracking`
--
ALTER TABLE `Tracking`
  ADD CONSTRAINT `tracking_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`vehicle_id`);

--
-- Constraints for table `Vehicle_Maintenance`
--
ALTER TABLE `Vehicle_Maintenance`
  ADD CONSTRAINT `vehicle_maintenance_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`vehicle_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
