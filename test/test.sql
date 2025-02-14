-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 03. 18:00
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `bufego_test`
--
CREATE DATABASE IF NOT EXISTS `bufego_test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bufego_test`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zip_code` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `addresses`
--

INSERT INTO `addresses` (`id`, `zip_code`, `city`, `address`) VALUES
(1, '1000', 'Teszt Város 1', 'Teszt Utca 1'),
(2, '2000', 'Teszt Város 2', 'Teszt Utca 2'),
(3, '3000', 'Érvénytelen', 'Nem létező cím');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `business_hours`
--

CREATE TABLE `business_hours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) DEFAULT NULL,
  `day_of_week` tinyint(4) DEFAULT NULL,
  `closed_all_day` tinyint(4) DEFAULT NULL,
  `open` time DEFAULT NULL,
  `close` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `place_id` (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `business_hours`
--

INSERT INTO `business_hours` (`id`, `place_id`, `day_of_week`, `closed_all_day`, `open`, `close`) VALUES
(1, 1, 1, 0, '08:00:00', '16:00:00'),
(2, 1, 2, 0, '08:00:00', '16:00:00'),
(3, 1, 3, 0, '08:00:00', '16:00:00'),
(4, 1, 4, 0, '08:00:00', '16:00:00'),
(5, 1, 5, 0, '08:00:00', '16:00:00'),
(6, 1, 6, 1, NULL, NULL),
(7, 1, 7, 1, NULL, NULL),
(8, 2, 1, 0, '09:00:00', '17:00:00'),
(9, 2, 2, 0, '09:00:00', '17:00:00'),
(10, 2, 3, 0, '09:00:00', '17:00:00'),
(11, 2, 4, 0, '09:00:00', '17:00:00'),
(12, 2, 5, 0, '09:00:00', '17:00:00'),
(13, 2, 6, 0, '09:00:00', '17:00:00'),
(14, 2, 7, 1, NULL, NULL),
(15, 3, 1, 0, '09:00:00', '17:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `business_info`
--

CREATE TABLE `business_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) DEFAULT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `tax_num` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `business_info`
--

INSERT INTO `business_info` (`id`, `place_id`, `business_name`, `tax_num`, `account_number`) VALUES
(1, 1, 'Teszt Business 1', '1234567-8-90', '12345678-12345678-12345678'),
(2, 2, 'Teszt Business 2', '9876543-2-10', '87654321-87654321-87654321'),
(3, 3, 'Teszt Business 3', '9876543-2-10', '87654321-87654321-87654321');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) DEFAULT NULL,
  `categroy_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `place_id` (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`id`, `place_id`, `categroy_name`) VALUES
(1, 1, 'Étel'),
(2, 1, 'Ital'),
(3, 2, 'Étel'),
(4, 2, 'Ital'),
(5, 3, 'Invalid Category');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderedproducts`
--

CREATE TABLE `orderedproducts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orderedproducts`
--

INSERT INTO `orderedproducts` (`id`, `order_id`, `quantity`, `product_id`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 2, 2, 2),
(4, 3, 1, 3),
(5, 4, 1, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `payment_method` tinyint(4) DEFAULT NULL,
  `orderd_at` datetime DEFAULT NULL,
  `collected_at` datetime DEFAULT NULL,
  `expected_pickup_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `place_id` (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `place_id`, `status`, `price`, `payment_method`, `orderd_at`, `collected_at`, `expected_pickup_time`) VALUES
(1, 1, 1, 0, 300, 1, '2023-01-10 10:00:00', NULL, 10),
(2, 1, 1, 1, 400, 2, '2023-01-15 11:00:00', '2023-01-15 11:15:00', 15),
(3, 2, 2, 2, 300, 1, '2023-01-20 12:00:00', '2023-01-20 12:30:00', 30),
(4, 2, 3, 2, 300, 1, '2023-01-20 12:00:00', '2023-01-20 12:30:00', 30);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` text NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `payment_on_collect_enabled` tinyint(4) DEFAULT NULL,
  `is_avaliable` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `places`
--

INSERT INTO `places` (`id`, `admin_user_id`, `name`, `description`, `image`, `phone`, `address_id`, `school_id`, `payment_on_collect_enabled`, `is_avaliable`) VALUES
(1, 2, 'Teszt Büfé 1', 'Teszt Leírás 1', '', '06204444444', 1, 1, 1, 1),
(2, 2, 'Teszt Büfé 2', 'Teszt Leírás 2', '', '06205555555', 2, 2, 0, 0),
(3, 2, 'Invalid Place', 'Teszt Leírás 3', '', 'invalid_phone', 3, 4, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `allergens` varchar(255) DEFAULT NULL,
  `is_avaliable` tinyint(4) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `place_id` (`place_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `place_id`, `category_id`, `image`, `name`, `description`, `allergens`, `is_avaliable`, `price`) VALUES
(1, 1, 1, '', 'Teszt Termék 1', 'Teszt Leírás 1', 'G, L', 1, 100),
(2, 1, 2, '', 'Teszt Termék 2', 'Teszt Leírás 2', '', 1, 200),
(3, 2, 3, '', 'Teszt Termék 3', 'Teszt Leírás 3', 'G', 0, 300),
(4, 3, 5, '', 'Invalid Product', 'Teszt Leírás 3', 'G', 0, 300);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `place_id` (`place_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `ratings`
--

INSERT INTO `ratings` (`id`, `user_id`, `place_id`, `rating`, `comment`, `date`, `status`) VALUES
(1, 1, 1, 5, 'Jó', '2023-01-10', 1),
(2, 2, 1, 3, 'Közepes', '2023-01-15', 1),
(3, 1, 2, 1, 'Rossz', '2023-01-20', 1),
(4, 1, 3, 1, 'Rossz', '2023-01-20', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `schools`
--

INSERT INTO `schools` (`id`, `name`) VALUES
(1, 'Teszt Iskola 1'),
(2, 'Teszt Iskola 2'),
(3, 'Nem létező Iskola');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `passcode` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `registered_on` date DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `push_notification_key` varchar(255) DEFAULT NULL,
  `is_place_owner` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `passcode`, `name`, `address_id`, `phone`, `school_id`, `registered_on`, `last_login`, `push_notification_key`, `is_place_owner`) VALUES
(1, 'teszt1@teszt.hu', '$2y$10$......................', 'Teszt User 1', 1, '06201111111', 1, '2023-01-01', NULL, NULL, 0),
(2, 'teszt2@teszt.hu', '$2y$10$......................', 'Teszt User 2', 2, '06202222222', 2, '2023-01-01', NULL, NULL, 1),
(3, 'teszt3@teszt.hu', '$2y$10$......................', 'Teszt User 3', 3, '06203333333', 4, '2023-01-01', NULL, NULL, 0),
(4, 'invalid@teszt.hu', '$2y$10$......................', 'Invalid User', 3, 'invalid_phone', 4, '2023-01-01', NULL, NULL, 0);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `business_hours`
--
ALTER TABLE `business_hours`
  ADD CONSTRAINT `business_hours_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`);

--
-- Megkötések a táblához `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`);

--
-- Megkötések a táblához `orderedproducts`
--
ALTER TABLE `orderedproducts`
  ADD CONSTRAINT `orderedProducts_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderedProducts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`);

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Megkötések a táblához `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;