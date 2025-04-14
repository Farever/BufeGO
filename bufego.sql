-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 14. 11:44
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
-- Adatbázis: `bufego`
--
CREATE DATABASE IF NOT EXISTS `bufego` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `bufego`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `addresses`
--

INSERT INTO `addresses` (`id`, `zip_code`, `city`, `address`) VALUES
(1, '8200', 'Veszprém', 'Iskola utca 4'),
(2, '8200', 'Veszprém', 'Kemecse utca 1'),
(3, '8200', 'Veszprém', 'Március 15. utca'),
(4, '8184', 'Balatonfűzfő', 'József Attila utca 12.'),
(5, '8191', 'Hajmáskér', 'Kossuth Lajos utca 8.'),
(6, '8225', 'Szentkirályszabadja', 'Petőfi Sándor utca 2.'),
(7, '8200', 'Veszprém', 'Kis utca 3'),
(8, '1252', 'ffaefaef', 'fafaef'),
(9, '1234', 'agfaef', 'afaefaef');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `place_id`, `quantity`, `product_id`) VALUES
(12, 1, 1, 4, 1),
(13, 1, 1, 1, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `place_id` int(11) DEFAULT NULL,
  `categroy_name` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL,
  `category_placement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`id`, `place_id`, `categroy_name`, `deleted`, `category_placement`) VALUES
(1, 1, 'Pékárúk', 0, 1),
(2, 1, 'Kávék', 0, 2),
(3, 1, 'Szendvicsek', 0, 1);

--
-- Eseményindítók `categories`
--
DROP TRIGGER IF EXISTS `CategoryUpdate`;
DELIMITER $$
CREATE TRIGGER `CategoryUpdate` AFTER UPDATE ON `categories` FOR EACH ROW INSERT INTO `logs` (`target_table`, `description`, `method`, `datetime`)
VALUES ('categories', CONCAT('Módosított kategória: ', NEW.id, 'Név: ', NEW.categroy_name, 'Törölt: ', NEW.deleted), 'UPDATE', NOW())
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `logs`
--

DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `target_table` text NOT NULL,
  `description` text NOT NULL,
  `method` text NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `logs`
--

INSERT INTO `logs` (`id`, `target_table`, `description`, `method`, `datetime`) VALUES
(1, 'categories', 'Módosított kategória: 2Név: KávékTörölt: 0', 'UPDATE', '2025-04-02 10:15:14'),
(2, 'categories', 'Módosított kategória: 3Név: SzendvicsekTörölt: 0', 'UPDATE', '2025-04-02 10:15:28'),
(3, 'orders', 'Új rendelés: 1', 'INSERT', '2025-04-02 10:16:09'),
(4, 'ratings', 'ID: 1Rating: 5', 'INSERT', '2025-04-02 10:34:58'),
(5, 'orders', 'Új rendelés: 2', 'INSERT', '2025-04-02 23:09:15'),
(6, 'orders', 'Új rendelés: 3', 'INSERT', '2025-04-09 16:27:51'),
(7, 'orders', 'Új rendelés: 4', 'INSERT', '2025-04-10 15:28:36'),
(8, 'orders', 'Új rendelés: 5', 'INSERT', '2025-04-10 15:28:51'),
(9, 'orders', 'Új rendelés: 6', 'INSERT', '2025-04-10 15:28:52'),
(10, 'categories', 'Módosított kategória: 4Név: Új kategóriaTörölt: 1', 'UPDATE', '2025-04-10 22:47:23'),
(11, 'orders', 'Új rendelés: 7', 'INSERT', '2025-04-10 22:52:12'),
(12, 'orders', 'Új rendelés: 8', 'INSERT', '2025-04-10 22:52:58'),
(13, 'orders', 'Új rendelés: 9', 'INSERT', '2025-04-10 22:54:45'),
(14, 'orders', 'Új rendelés: 10', 'INSERT', '2025-04-10 22:55:31'),
(15, 'categories', 'Módosított kategória: 3Név: SzendvicsekTörölt: 1', 'UPDATE', '2025-04-14 10:09:51'),
(16, 'categories', 'Módosított kategória: 3Név: SzendvicsekTörölt: 0', 'UPDATE', '2025-04-14 10:10:05'),
(17, 'categories', 'Módosított kategória: 2Név: KávékTörölt: 1', 'UPDATE', '2025-04-14 10:11:32'),
(18, 'categories', 'Módosított kategória: 2Név: KávékTörölt: 0', 'UPDATE', '2025-04-14 10:11:46'),
(19, 'orders', 'Új rendelés: 11', 'INSERT', '2025-04-14 10:17:42');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderedproducts`
--

DROP TABLE IF EXISTS `orderedproducts`;
CREATE TABLE `orderedproducts` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orderedproducts`
--

INSERT INTO `orderedproducts` (`id`, `order_id`, `quantity`, `product_id`) VALUES
(1, 1, 5, 1),
(2, 2, 3, 1),
(3, 2, 1, 1),
(4, 3, 3, 1),
(5, 4, 1, 2),
(6, 5, 1, 1),
(11, 11, 3, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `payment_method` tinyint(4) DEFAULT NULL,
  `orderd_at` datetime DEFAULT NULL,
  `collected_at` datetime DEFAULT NULL,
  `expected_pickup_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `place_id`, `status`, `price`, `payment_method`, `orderd_at`, `collected_at`, `expected_pickup_time`) VALUES
(1, 1, 1, 5, 2500, 1, '2025-04-02 10:16:09', NULL, '2025-04-02 10:23:09'),
(2, 1, 1, 4, 2000, 1, '2025-04-02 23:09:15', NULL, '2025-04-02 23:16:15'),
(3, 1, 1, 2, 1500, 1, '2025-04-09 16:27:51', NULL, '2025-04-09 16:34:51'),
(4, 1, 1, 2, 300, 1, '2025-04-10 15:28:36', NULL, '2025-04-10 15:35:36'),
(5, 1, 1, 2, 500, 1, '2025-04-10 15:28:51', NULL, '2025-04-10 15:35:51'),
(11, 2, 1, 1, 2250, 1, '2025-04-14 10:17:42', NULL, '2025-04-14 10:24:42');

--
-- Eseményindítók `orders`
--
DROP TRIGGER IF EXISTS `NewOrderLog`;
DELIMITER $$
CREATE TRIGGER `NewOrderLog` AFTER INSERT ON `orders` FOR EACH ROW INSERT INTO `logs` (`target_table`, `description`, `method`, `datetime`)
VALUES ('orders', CONCAT('Új rendelés: ', NEW.id), 'INSERT', NOW())
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `places`
--

DROP TABLE IF EXISTS `places`;
CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `admin_user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `image` text NOT NULL,
  `payment_on_collect_enabled` tinyint(4) DEFAULT NULL,
  `is_avaliable` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `places`
--

INSERT INTO `places` (`id`, `admin_user_id`, `name`, `description`, `phone`, `address_id`, `school_id`, `image`, `payment_on_collect_enabled`, `is_avaliable`) VALUES
(1, 5, 'Ipari Büfé', 'Az Ipari Technikum iskolai büféje, széles választékkal.', '+36201118899', 1, 1, 'Ipari_Bf', 0, 0),
(2, 6, 'Vetési Büfé', 'Friss pékáruk és üdítők a gimnázium diákjainak.', '+36202223344', 2, 2, 'bufe_2', 0, 0),
(3, 5, 'VeneSnack', 'Kávékülönlegességek és szendvicsek a hallgatóknak.', '+36203334455', 3, 3, 'VeneSnack', 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `place_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `allergens` varchar(255) DEFAULT NULL,
  `is_avaliable` tinyint(4) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `place_id`, `category_id`, `image`, `name`, `description`, `allergens`, `is_avaliable`, `price`, `deleted`) VALUES
(1, 1, 1, '1_product_Kakas_csiga', 'Kakaós csiga', 'Friss kakaós csiga', 'g', 1, 500, 0),
(2, 1, 2, '1_product_Esspresso', 'Esspresso', 'Frissen őrölt kávéból', '', 1, 300, 0),
(3, 1, 3, '1_product_Sonkás_szendvics', 'Sonkás szendvics', '', '', 1, 650, 0),
(4, 1, 1, '1_product_Sajtos_pogcsa', 'Sajtos pogácsa', 'Friss ropogós sajtos pogácsa', 'g', 1, 450, 0),
(5, 1, 1, '1_product_Pizza_szelet', 'Pizza szelet', '', 'g', 1, 750, 0),
(6, 1, 2, '1_product_Cappuccino', 'Cappuccino', 'Kávé', 'tej', 1, 500, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ratings`
--

DROP TABLE IF EXISTS `ratings`;
CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `ratings`
--

INSERT INTO `ratings` (`id`, `user_id`, `place_id`, `order_id`, `rating`, `comment`, `date`, `status`) VALUES
(1, 1, 1, 1, 5, '', '2025-04-02', 1);

--
-- Eseményindítók `ratings`
--
DROP TRIGGER IF EXISTS `RatingsLog`;
DELIMITER $$
CREATE TRIGGER `RatingsLog` AFTER INSERT ON `ratings` FOR EACH ROW INSERT INTO `logs` (`target_table`, `description`, `method`, `datetime`)
VALUES ('ratings', CONCAT('ID: ', NEW.id, 'Rating: ', NEW.rating), 'INSERT', NOW())
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `schools`
--

DROP TABLE IF EXISTS `schools`;
CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `schools`
--

INSERT INTO `schools` (`id`, `name`) VALUES
(1, 'VSZC Ipari Technikum'),
(2, 'Vetési Albert Gimnázium'),
(3, 'VSZC Jendrassik-Venesz Technikum'),
(4, 'Lovassy László Gimnázium');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
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
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `passcode`, `name`, `address_id`, `phone`, `school_id`, `registered_on`, `last_login`, `push_notification_key`, `is_place_owner`, `isActive`) VALUES
(1, 'peter.kovacs@gmail.com', 'aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0', 'Kovács Péter', 1, '+36201234567', 1, '2024-03-15', NULL, NULL, 0, 1),
(2, 'anna.szabo@gmail.com', 'aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0', 'Szabó Anna', 2, '+36209876543', 2, '2024-02-10', NULL, NULL, 0, 1),
(3, 'mate.nagy@gmail.com', 'aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0', 'Nagy Máté', 3, '+36201112233', 3, '2024-01-05', NULL, NULL, 0, 1),
(4, 'eszter.toth@gmail.com', 'aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0', 'Tóth Eszter', 4, '+36205556677', 1, '2023-12-20', NULL, NULL, 0, 1),
(5, 'admin1@bufego.com', 'aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0', 'Admin Felhasználó 1', 5, '+36201118899', 1, '2023-11-25', NULL, NULL, 1, 1),
(6, 'admin2@bufego.com', 'aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0', 'Admin Felhasználó 2', 6, '+36202223344', 2, '2023-11-30', NULL, NULL, 1, 1),
(9, 'nagylajosdominik@gmail.com', 'aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0', 'Dominik Nagy', 9, '+36204561234', 1, '2025-04-14', NULL, '', 0, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `place_id` (`place_id`);

--
-- A tábla indexei `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `orderedproducts`
--
ALTER TABLE `orderedproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `place_id` (`place_id`);

--
-- A tábla indexei `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `place_id` (`place_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `place_id` (`place_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emailAddress` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `orderedproducts`
--
ALTER TABLE `orderedproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Megkötések a kiírt táblákhoz
--

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
