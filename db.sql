-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.27-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pcrp-core
CREATE DATABASE IF NOT EXISTS `pcrp-core` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `pcrp-core`;

-- Dumping structure for table pcrp-core.daily_free
CREATE TABLE IF NOT EXISTS `daily_free` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) DEFAULT NULL,
  `last_collected` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `collected` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table pcrp-core.garages
CREATE TABLE IF NOT EXISTS `garages` (
  `identifier` varchar(100) NOT NULL,
  `parkings` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table pcrp-core.jobs_levels
CREATE TABLE IF NOT EXISTS `jobs_levels` (
  `identifier` varchar(55) NOT NULL DEFAULT '',
  `xp` int(11) DEFAULT 0,
  `rank` int(11) DEFAULT 1,
  `job` varchar(255) NOT NULL DEFAULT 'unemployed',
  PRIMARY KEY (`identifier`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table pcrp-core.users
CREATE TABLE IF NOT EXISTS `users` (
  `charid` varchar(100) NOT NULL,
  `identifier` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`charid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table pcrp-core.users_maxcharacters
CREATE TABLE IF NOT EXISTS `users_maxcharacters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) DEFAULT NULL,
  `maxcharacters` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table pcrp-core.user_accounts
CREATE TABLE IF NOT EXISTS `user_accounts` (
  `identifier` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table pcrp-core.user_character_info
CREATE TABLE IF NOT EXISTS `user_character_info` (
  `charid` varchar(50) NOT NULL DEFAULT '0',
  `cid` tinyint(4) NOT NULL DEFAULT 0,
  `birthdate` varchar(50) NOT NULL DEFAULT '',
  `firstname` varchar(50) NOT NULL DEFAULT '0',
  `lastname` varchar(50) NOT NULL DEFAULT '0',
  `nationality` varchar(50) NOT NULL DEFAULT '0',
  `gender` char(1) NOT NULL DEFAULT 'm',
  PRIMARY KEY (`charid`),
  CONSTRAINT `ck_gender` CHECK (lcase(`gender`) in ('m','f'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Character information for Users\r\n\r\n{"birthdate":"2000-12-12","cid":"2","firstname":"Facundo","gender":"man","lastname":"Utrico","nationality":"Uruguay"}';

-- Data exporting was unselected.

-- Dumping structure for table pcrp-core.user_stats
CREATE TABLE IF NOT EXISTS `user_stats` (
  `identifier` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

-- Dumping structure for table pcrp-core.user_vehicles
CREATE TABLE IF NOT EXISTS `user_vehicles` (
  `identifier` varchar(100) NOT NULL,
  `info` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
