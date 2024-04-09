-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 18, 2024 at 10:34 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fed23_photoapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `photo`
--

CREATE TABLE `photo` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `photo`
--

INSERT INTO `photo` (`id`, `title`, `url`, `comment`, `userId`) VALUES
(1, 'A lion having a laugh', 'https://www.pexels.com/sv-se/foto/natur-djur-pals-farlig-4032590/', 'Jokes', 4),
(2, 'Birds', 'https://www.pexels.com/sv-se/foto/stad-flygande-byggnad-djur-17200139/', 'My favourite birds', 4),
(3, 'What is måsar called in english', 'https://www.pexels.com/sv-se/foto/flygande-strand-frihet-fiskmasar-207237/', 'Leave my hotdog alone', 5),
(4, 'What is måsar called in english', 'https://www.pexels.com/sv-se/foto/flygande-strand-frihet-fiskmasar-207237/', NULL, 5),
(5, 'More måses', 'https://www.pexels.com/sv-se/foto/hav-himmel-flygande-djur-54462/', NULL, 5),
(6, 'Attack', 'https://www.pexels.com/sv-se/foto/flyg-flygande-gaende-flicka-2091074/', 'Send help, asap', 5),
(7, 'Sunflowers', 'https://www.pexels.com/sv-se/foto/natur-falt-blommor-gul-54267/', 'Pretty', 5),
(8, 'Vaycay mode', 'https://www.pexels.com/sv-se/foto/hav-natur-fagel-strand-66258/', 'Swimming', 9),
(9, 'Vaycay mode', 'https://www.pexels.com/sv-se/foto/hav-natur-fagel-strand-66258/', NULL, 9),
(10, 'Hello', 'https://www.pexels.com/sv-se/foto/hav-natur-strand-vatten-3751036/', 'Dubble post cuz pretty', 9),
(11, 'Another pic of me', 'https://www.pexels', NULL, 9),
(12, 'Another pic of me', 'https://www.pexels', NULL, 9),
(13, 'Another pic of me', 'https://www.pexels', NULL, 9),
(14, 'Another pic of me', 'https://www.pexels.com', NULL, 9),
(15, 'Another pic of me', 'https://www.com', NULL, 9),
(16, 'Woop', 'https://www.com', NULL, 9),
(17, 'Hellooo', 'https://www.pexels.com/sv-se/foto/174667/', 'Pineaplles', 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Photo_userId_fkey` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `Photo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
