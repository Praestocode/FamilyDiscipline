-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Creato il: Lug 15, 2025 alle 11:58
-- Versione del server: 8.0.42
-- Versione PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `duotracker_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `cigarettes`
--

CREATE TABLE `cigarettes` (
  `user_id` bigint UNSIGNED NOT NULL,
  `count` int NOT NULL DEFAULT '0',
  `limit` int NOT NULL DEFAULT '10',
  `consecutive_days` int NOT NULL DEFAULT '0',
  `consecutive_weeks` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `cigarettes`
--

INSERT INTO `cigarettes` (`user_id`, `count`, `limit`, `consecutive_days`, `consecutive_weeks`, `created_at`, `updated_at`) VALUES
(1, 0, 10, 0, 0, '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(2, 0, 10, 0, 0, '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(3, 0, 10, 0, 0, '2025-07-15 11:57:16', '2025-07-15 11:57:16');

-- --------------------------------------------------------

--
-- Struttura della tabella `daily_points`
--

CREATE TABLE `daily_points` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `points` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_04_27_174018_create_statuses_table', 1),
(2, '2025_05_18_123727_create_users_table', 1),
(3, '2025_05_18_124036_create_daily_points_table', 1),
(4, '2025_05_18_124037_create_cigarettes_table', 1),
(5, '2025_05_18_124037_create_tasks_table', 1),
(6, '2025_05_18_124037_create_weights_table', 1),
(7, '2025_05_18_124436_create_personal_access_tokens_table', 1),
(8, '2025_05_18_130716_create_cache_table', 1),
(9, '2025_07_15_103440_create_sessions_table', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `statuses`
--

CREATE TABLE `statuses` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `required_points` int NOT NULL,
  `icon_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `statuses`
--

INSERT INTO `statuses` (`id`, `name`, `required_points`, `icon_path`, `created_at`, `updated_at`) VALUES
(1, 'Coglioncello', 0, 'images/icons/coglioncello.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(2, 'Buffone', 1000, 'images/icons/buffone.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(3, 'Principiante', 2000, 'images/icons/principiante.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(4, 'Dedicato', 3500, 'images/icons/dedicato.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(5, 'Costante', 4500, 'images/icons/costante.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(6, 'Campione', 6000, 'images/icons/campione.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(7, 'Maestro', 8000, 'images/icons/maestro.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(8, 'Re', 10000, 'images/icons/re.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(9, 'Leggenda', 20000, 'images/icons/leggenda.png', '2025-07-15 11:57:16', '2025-07-15 11:57:16');

-- --------------------------------------------------------

--
-- Struttura della tabella `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `points_earned` int NOT NULL DEFAULT '0',
  `weekday_5_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_5_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_5_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_5_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_5_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_5_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_6_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_6_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_6_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_6_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_6_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_6_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_7_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_7_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_7_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_7_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_7_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_7_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_8_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_8_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_8_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_8_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_8_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_8_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_9_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_9_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_9_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_9_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_9_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_9_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_10_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_10_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_10_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_10_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_10_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_10_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_11_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_11_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_11_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_11_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_11_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_11_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_12_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_12_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_12_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_12_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_12_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_12_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_13_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_13_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_13_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_13_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_13_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_13_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_14_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_14_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_14_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_14_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_14_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_14_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_15_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_15_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_15_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_15_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_15_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_15_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_16_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_16_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_16_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_16_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_16_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_16_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_17_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_17_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_17_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_17_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_17_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_17_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_18_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_18_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_18_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_18_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_18_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_18_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_19_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_19_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_19_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_19_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_19_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_19_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_20_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_20_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_20_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_20_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_20_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_20_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_21_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_21_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_21_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_21_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_21_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_21_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_22_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekday_22_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_22_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekday_22_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekday_22_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekday_22_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_5_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_5_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_5_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_5_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_5_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_5_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_6_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_6_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_6_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_6_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_6_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_6_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_7_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_7_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_7_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_7_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_7_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_7_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_8_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_8_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_8_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_8_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_8_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_8_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_9_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_9_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_9_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_9_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_9_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_9_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_10_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_10_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_10_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_10_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_10_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_10_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_11_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_11_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_11_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_11_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_11_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_11_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_12_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_12_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_12_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_12_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_12_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_12_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_13_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_13_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_13_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_13_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_13_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_13_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_14_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_14_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_14_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_14_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_14_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_14_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_15_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_15_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_15_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_15_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_15_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_15_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_16_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_16_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_16_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_16_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_16_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_16_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_17_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_17_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_17_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_17_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_17_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_17_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_18_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_18_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_18_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_18_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_18_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_18_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_19_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_19_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_19_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_19_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_19_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_19_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_20_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_20_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_20_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_20_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_20_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_20_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_21_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_21_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_21_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_21_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_21_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_21_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_22_task_1` text COLLATE utf8mb4_unicode_ci,
  `weekend_22_task_1_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_22_task_2` text COLLATE utf8mb4_unicode_ci,
  `weekend_22_task_2_completed` tinyint(1) NOT NULL DEFAULT '0',
  `weekend_22_task_3` text COLLATE utf8mb4_unicode_ci,
  `weekend_22_task_3_completed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `points_earned`, `weekday_5_task_1`, `weekday_5_task_1_completed`, `weekday_5_task_2`, `weekday_5_task_2_completed`, `weekday_5_task_3`, `weekday_5_task_3_completed`, `weekday_6_task_1`, `weekday_6_task_1_completed`, `weekday_6_task_2`, `weekday_6_task_2_completed`, `weekday_6_task_3`, `weekday_6_task_3_completed`, `weekday_7_task_1`, `weekday_7_task_1_completed`, `weekday_7_task_2`, `weekday_7_task_2_completed`, `weekday_7_task_3`, `weekday_7_task_3_completed`, `weekday_8_task_1`, `weekday_8_task_1_completed`, `weekday_8_task_2`, `weekday_8_task_2_completed`, `weekday_8_task_3`, `weekday_8_task_3_completed`, `weekday_9_task_1`, `weekday_9_task_1_completed`, `weekday_9_task_2`, `weekday_9_task_2_completed`, `weekday_9_task_3`, `weekday_9_task_3_completed`, `weekday_10_task_1`, `weekday_10_task_1_completed`, `weekday_10_task_2`, `weekday_10_task_2_completed`, `weekday_10_task_3`, `weekday_10_task_3_completed`, `weekday_11_task_1`, `weekday_11_task_1_completed`, `weekday_11_task_2`, `weekday_11_task_2_completed`, `weekday_11_task_3`, `weekday_11_task_3_completed`, `weekday_12_task_1`, `weekday_12_task_1_completed`, `weekday_12_task_2`, `weekday_12_task_2_completed`, `weekday_12_task_3`, `weekday_12_task_3_completed`, `weekday_13_task_1`, `weekday_13_task_1_completed`, `weekday_13_task_2`, `weekday_13_task_2_completed`, `weekday_13_task_3`, `weekday_13_task_3_completed`, `weekday_14_task_1`, `weekday_14_task_1_completed`, `weekday_14_task_2`, `weekday_14_task_2_completed`, `weekday_14_task_3`, `weekday_14_task_3_completed`, `weekday_15_task_1`, `weekday_15_task_1_completed`, `weekday_15_task_2`, `weekday_15_task_2_completed`, `weekday_15_task_3`, `weekday_15_task_3_completed`, `weekday_16_task_1`, `weekday_16_task_1_completed`, `weekday_16_task_2`, `weekday_16_task_2_completed`, `weekday_16_task_3`, `weekday_16_task_3_completed`, `weekday_17_task_1`, `weekday_17_task_1_completed`, `weekday_17_task_2`, `weekday_17_task_2_completed`, `weekday_17_task_3`, `weekday_17_task_3_completed`, `weekday_18_task_1`, `weekday_18_task_1_completed`, `weekday_18_task_2`, `weekday_18_task_2_completed`, `weekday_18_task_3`, `weekday_18_task_3_completed`, `weekday_19_task_1`, `weekday_19_task_1_completed`, `weekday_19_task_2`, `weekday_19_task_2_completed`, `weekday_19_task_3`, `weekday_19_task_3_completed`, `weekday_20_task_1`, `weekday_20_task_1_completed`, `weekday_20_task_2`, `weekday_20_task_2_completed`, `weekday_20_task_3`, `weekday_20_task_3_completed`, `weekday_21_task_1`, `weekday_21_task_1_completed`, `weekday_21_task_2`, `weekday_21_task_2_completed`, `weekday_21_task_3`, `weekday_21_task_3_completed`, `weekday_22_task_1`, `weekday_22_task_1_completed`, `weekday_22_task_2`, `weekday_22_task_2_completed`, `weekday_22_task_3`, `weekday_22_task_3_completed`, `weekend_5_task_1`, `weekend_5_task_1_completed`, `weekend_5_task_2`, `weekend_5_task_2_completed`, `weekend_5_task_3`, `weekend_5_task_3_completed`, `weekend_6_task_1`, `weekend_6_task_1_completed`, `weekend_6_task_2`, `weekend_6_task_2_completed`, `weekend_6_task_3`, `weekend_6_task_3_completed`, `weekend_7_task_1`, `weekend_7_task_1_completed`, `weekend_7_task_2`, `weekend_7_task_2_completed`, `weekend_7_task_3`, `weekend_7_task_3_completed`, `weekend_8_task_1`, `weekend_8_task_1_completed`, `weekend_8_task_2`, `weekend_8_task_2_completed`, `weekend_8_task_3`, `weekend_8_task_3_completed`, `weekend_9_task_1`, `weekend_9_task_1_completed`, `weekend_9_task_2`, `weekend_9_task_2_completed`, `weekend_9_task_3`, `weekend_9_task_3_completed`, `weekend_10_task_1`, `weekend_10_task_1_completed`, `weekend_10_task_2`, `weekend_10_task_2_completed`, `weekend_10_task_3`, `weekend_10_task_3_completed`, `weekend_11_task_1`, `weekend_11_task_1_completed`, `weekend_11_task_2`, `weekend_11_task_2_completed`, `weekend_11_task_3`, `weekend_11_task_3_completed`, `weekend_12_task_1`, `weekend_12_task_1_completed`, `weekend_12_task_2`, `weekend_12_task_2_completed`, `weekend_12_task_3`, `weekend_12_task_3_completed`, `weekend_13_task_1`, `weekend_13_task_1_completed`, `weekend_13_task_2`, `weekend_13_task_2_completed`, `weekend_13_task_3`, `weekend_13_task_3_completed`, `weekend_14_task_1`, `weekend_14_task_1_completed`, `weekend_14_task_2`, `weekend_14_task_2_completed`, `weekend_14_task_3`, `weekend_14_task_3_completed`, `weekend_15_task_1`, `weekend_15_task_1_completed`, `weekend_15_task_2`, `weekend_15_task_2_completed`, `weekend_15_task_3`, `weekend_15_task_3_completed`, `weekend_16_task_1`, `weekend_16_task_1_completed`, `weekend_16_task_2`, `weekend_16_task_2_completed`, `weekend_16_task_3`, `weekend_16_task_3_completed`, `weekend_17_task_1`, `weekend_17_task_1_completed`, `weekend_17_task_2`, `weekend_17_task_2_completed`, `weekend_17_task_3`, `weekend_17_task_3_completed`, `weekend_18_task_1`, `weekend_18_task_1_completed`, `weekend_18_task_2`, `weekend_18_task_2_completed`, `weekend_18_task_3`, `weekend_18_task_3_completed`, `weekend_19_task_1`, `weekend_19_task_1_completed`, `weekend_19_task_2`, `weekend_19_task_2_completed`, `weekend_19_task_3`, `weekend_19_task_3_completed`, `weekend_20_task_1`, `weekend_20_task_1_completed`, `weekend_20_task_2`, `weekend_20_task_2_completed`, `weekend_20_task_3`, `weekend_20_task_3_completed`, `weekend_21_task_1`, `weekend_21_task_1_completed`, `weekend_21_task_2`, `weekend_21_task_2_completed`, `weekend_21_task_3`, `weekend_21_task_3_completed`, `weekend_22_task_1`, `weekend_22_task_1_completed`, `weekend_22_task_2`, `weekend_22_task_2_completed`, `weekend_22_task_3`, `weekend_22_task_3_completed`, `created_at`, `updated_at`) VALUES
(1, 1, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(2, 2, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(3, 3, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, '2025-07-15 11:57:16', '2025-07-15 11:57:16');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discipline_points` int NOT NULL DEFAULT '0',
  `total_points_earned_by_smoke_so_far` int NOT NULL DEFAULT '0',
  `total_points_earned_by_weight_so_far` int NOT NULL DEFAULT '0',
  `total_points_earned_by_tasks_so_far` int NOT NULL DEFAULT '0',
  `status_id` bigint UNSIGNED NOT NULL DEFAULT '1',
  `profile_picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `int_tasks` tinyint(1) NOT NULL DEFAULT '0',
  `int_weight` tinyint(1) NOT NULL DEFAULT '0',
  `int_smoke` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `discipline_points`, `total_points_earned_by_smoke_so_far`, `total_points_earned_by_weight_so_far`, `total_points_earned_by_tasks_so_far`, `status_id`, `profile_picture`, `int_tasks`, `int_weight`, `int_smoke`, `created_at`, `updated_at`) VALUES
(1, 'Virgilio', 'virgiliopolini97@gmail.com', '$2y$12$1oG9Nxrfnkcl1K5fZZyvsOa.q.PmSa3F5Xnw3ofXjZwBBjMwL1N2q', 0, 0, 0, 0, 1, 'images/virgipp.webp', 1, 1, 1, '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(2, 'Riccardo', 'riccardogiordano97@gmail.com', '$2y$12$X9tfmUUXSNMkjy.r08T2O.62OkAXTIqgTqzCTDJ6HyuBh06Y7vfL6', 0, 0, 0, 0, 1, 'images/richpp.webp', 1, 1, 1, '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(3, 'Lucy', 'lucia.dngls@gmail.com', '$2y$12$djiGcmT.Il2TEzAGFRjuTumsWqRv44JdULj3eHwb0MJ44qlXvoGMS', 0, 0, 0, 0, 1, 'images/lucypp.webp', 1, 1, 1, '2025-07-15 11:57:16', '2025-07-15 11:57:16');

-- --------------------------------------------------------

--
-- Struttura della tabella `weights`
--

CREATE TABLE `weights` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `starting_weight` double NOT NULL,
  `current_weight` double DEFAULT NULL,
  `ideal_weight` double NOT NULL,
  `points_earned` int NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `weights`
--

INSERT INTO `weights` (`id`, `user_id`, `starting_weight`, `current_weight`, `ideal_weight`, `points_earned`, `date`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 0, 0, 0, '2025-07-15', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(2, 2, 0, 0, 0, 0, '2025-07-15', '2025-07-15 11:57:16', '2025-07-15 11:57:16'),
(3, 3, 0, 0, 0, 0, '2025-07-15', '2025-07-15 11:57:16', '2025-07-15 11:57:16');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indici per le tabelle `cigarettes`
--
ALTER TABLE `cigarettes`
  ADD PRIMARY KEY (`user_id`);

--
-- Indici per le tabelle `daily_points`
--
ALTER TABLE `daily_points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `daily_points_user_id_foreign` (`user_id`);

--
-- Indici per le tabelle `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indici per le tabelle `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indici per le tabelle `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `statuses_name_unique` (`name`);

--
-- Indici per le tabelle `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_user_id_foreign` (`user_id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_status_id_foreign` (`status_id`);

--
-- Indici per le tabelle `weights`
--
ALTER TABLE `weights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `weights_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `daily_points`
--
ALTER TABLE `daily_points`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT per la tabella `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT per la tabella `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `weights`
--
ALTER TABLE `weights`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `cigarettes`
--
ALTER TABLE `cigarettes`
  ADD CONSTRAINT `cigarettes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `daily_points`
--
ALTER TABLE `daily_points`
  ADD CONSTRAINT `daily_points_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE RESTRICT;

--
-- Limiti per la tabella `weights`
--
ALTER TABLE `weights`
  ADD CONSTRAINT `weights_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
