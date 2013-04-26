-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Machine: 127.0.0.1
-- Genereertijd: 26 apr 2013 om 07:13
-- Serverversie: 5.5.27
-- PHP-versie: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `speechvision`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `admins`
--

CREATE TABLE IF NOT EXISTS `admins` (
  `admin_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_email` varchar(255) NOT NULL,
  `admin_password` char(64) NOT NULL,
  `admin_passwordsalt` char(64) NOT NULL,
  `admin_firstname` varchar(255) NOT NULL,
  `admin_surname` varchar(255) NOT NULL,
  `admin_gender` varchar(10) NOT NULL,
  `admin_createddate` datetime NOT NULL,
  `admin_modifieddate` datetime DEFAULT NULL,
  `admin_deleteddate` datetime DEFAULT NULL,
  `admin_lastloggedindate` datetime DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Gegevens worden uitgevoerd voor tabel `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_email`, `admin_password`, `admin_passwordsalt`, `admin_firstname`, `admin_surname`, `admin_gender`, `admin_createddate`, `admin_modifieddate`, `admin_deleteddate`, `admin_lastloggedindate`) VALUES
(1, 'stefaan.ch@gmail.com', 'wL39u6F0TZvlkb4Q1Y5zjPVodyc=', 'j6l/2OqSEBrHy1lY8WPkBkK2sTnkHfQdiIVbwggMvH4=', 'Stefaan', 'Christiaens', 'm', '2013-04-05 08:42:12', NULL, NULL, '2013-04-24 19:33:42');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `errorcategories`
--

CREATE TABLE IF NOT EXISTS `errorcategories` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Gegevens worden uitgevoerd voor tabel `errorcategories`
--

INSERT INTO `errorcategories` (`category_id`, `category_name`) VALUES
(1, 'Syllabestructuurproces'),
(2, 'Substitutieproces'),
(3, 'Harmonieproces'),
(4, 'Overige');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `errors`
--

CREATE TABLE IF NOT EXISTS `errors` (
  `error_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `error_name` varchar(255) NOT NULL,
  `error_description` text,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`error_id`),
  KEY `fk_errors_categories1` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `image_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `image_phonetic` varchar(255) NOT NULL,
  `image_sentence` varchar(500) NOT NULL,
  `image_soundurl` varchar(255) NOT NULL,
  `image_admin` int(11) unsigned NOT NULL,
  `image_createddate` datetime NOT NULL,
  `image_modifieddate` datetime DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `fk_images_admins1_idx` (`image_admin`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Gegevens worden uitgevoerd voor tabel `images`
--

INSERT INTO `images` (`image_id`, `image_name`, `image_url`, `image_phonetic`, `image_sentence`, `image_soundurl`, `image_admin`, `image_createddate`, `image_modifieddate`) VALUES
(1, 'Stefaan', 'cy5wbmc0NTc=.png', 'gwJ0AFsCZgBhADoASwE=', 'Dit is stefaan', 'NzMud2F2NTY4.wav', 1, '2013-04-20 12:44:52', '0001-01-01 00:00:00'),
(2, 'Vrienden', 'c3Q0LmpwZzQ0OA==.jpeg', 'dgByAGoCWwJLAWQAZQBuAA==', 'Dit zijn de beste vrienden.', 'NzMud2F2NzA4.wav', 1, '2013-04-20 12:45:31', '0001-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `results`
--

CREATE TABLE IF NOT EXISTS `results` (
  `result_id` bigint(20) NOT NULL,
  `test_order` int(11) DEFAULT NULL,
  `result_audiosource` varchar(255) NOT NULL,
  `result_phonetic` varchar(255) NOT NULL,
  `test_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`result_id`),
  KEY `fk_results_tests1_idx` (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `results_has_errors`
--

CREATE TABLE IF NOT EXISTS `results_has_errors` (
  `result_id` bigint(20) NOT NULL,
  `error_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`result_id`,`error_id`),
  KEY `fk_results_has_errors_errors1_idx` (`error_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `routines`
--

CREATE TABLE IF NOT EXISTS `routines` (
  `routine_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `routine_name` varchar(255) NOT NULL,
  `routine_url` varchar(255) DEFAULT NULL,
  `routine_createddate` datetime NOT NULL,
  `routine_modifieddate` datetime DEFAULT NULL,
  `routine_deleteddate` datetime DEFAULT NULL,
  `admin_created` int(11) unsigned NOT NULL,
  PRIMARY KEY (`routine_id`),
  KEY `fk_routines_admins1_idx` (`admin_created`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Gegevens worden uitgevoerd voor tabel `routines`
--

INSERT INTO `routines` (`routine_id`, `routine_name`, `routine_url`, `routine_createddate`, `routine_modifieddate`, `routine_deleteddate`, `admin_created`) VALUES
(1, 'test', NULL, '2013-04-20 12:54:51', '2013-04-20 12:55:08', NULL, 1),
(2, 'test2', NULL, '2013-04-20 13:25:42', '2013-04-20 13:25:47', NULL, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `routines_has_images`
--

CREATE TABLE IF NOT EXISTS `routines_has_images` (
  `routine_id` int(10) unsigned NOT NULL,
  `image_id` int(10) unsigned NOT NULL,
  `image_order` int(11) NOT NULL,
  PRIMARY KEY (`routine_id`,`image_id`),
  KEY `fk_routines_has_images_images1` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden uitgevoerd voor tabel `routines_has_images`
--

INSERT INTO `routines_has_images` (`routine_id`, `image_id`, `image_order`) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 1, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tests`
--

CREATE TABLE IF NOT EXISTS `tests` (
  `test_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `test_createddate` datetime NOT NULL,
  `test_modifieddate` datetime DEFAULT NULL,
  `test_deleteddate` datetime DEFAULT NULL,
  `test_finisheddate` datetime DEFAULT NULL,
  `test_analyseddate` datetime DEFAULT NULL,
  `test_kind` varchar(20) NOT NULL COMMENT 'Normal, repeat, finish(sentence)',
  `admin_id` int(11) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `routine_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`test_id`),
  KEY `fk_tests_admins1` (`admin_id`),
  KEY `fk_tests_users1` (`user_id`),
  KEY `fk_tests_routines1` (`routine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(255) NOT NULL,
  `user_surname` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_dateofbirth` date NOT NULL,
  `user_gender` varchar(10) NOT NULL,
  `user_speech` int(11) DEFAULT NULL,
  `user_language` int(11) DEFAULT NULL,
  `user_hearing` int(11) DEFAULT NULL,
  `user_anamnesis` int(11) DEFAULT NULL,
  `user_other` text,
  `user_report` text,
  `user_createddate` datetime NOT NULL,
  `user_modifieddate` datetime DEFAULT NULL,
  `user_deleteddate` datetime DEFAULT NULL,
  `admin_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_users_admins1` (`admin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Gegevens worden uitgevoerd voor tabel `users`
--

INSERT INTO `users` (`user_id`, `user_firstname`, `user_surname`, `user_email`, `user_dateofbirth`, `user_gender`, `user_speech`, `user_language`, `user_hearing`, `user_anamnesis`, `user_other`, `user_report`, `user_createddate`, `user_modifieddate`, `user_deleteddate`, `admin_id`) VALUES
(4, 'Test', 'Kind', 'stefaan.ch@gmail.com', '2005-04-21', 'f', 0, 0, 0, 0, NULL, NULL, '2013-04-20 13:35:38', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 1),
(5, 'Blq Blq', 'BlaBla', 'stefaan.ch@gmail.com', '2013-04-17', 'f', 0, 0, 0, 0, NULL, NULL, '2013-04-20 13:36:03', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 1),
(6, 'Johan', 'Van Peetersen', 'stefaan.ch@gmail.com', '2013-04-09', 'm', 0, 0, 0, 0, NULL, NULL, '2013-04-20 14:10:32', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 1),
(7, 'Kindersen', 'Johonalsenderken', 'stefaan.ch@gmail.com', '2013-04-15', 'm', 0, 0, 0, 0, NULL, NULL, '2013-04-20 14:10:58', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 1);

--
-- Beperkingen voor gedumpte tabellen
--

--
-- Beperkingen voor tabel `errors`
--
ALTER TABLE `errors`
  ADD CONSTRAINT `fk_errors_categories1` FOREIGN KEY (`category_id`) REFERENCES `errorcategories` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_images_admins1` FOREIGN KEY (`image_admin`) REFERENCES `admins` (`admin_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `fk_results_tests1` FOREIGN KEY (`test_id`) REFERENCES `tests` (`test_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `results_has_errors`
--
ALTER TABLE `results_has_errors`
  ADD CONSTRAINT `fk_results_has_errors_errors1` FOREIGN KEY (`error_id`) REFERENCES `errors` (`error_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_results_has_errors_results1` FOREIGN KEY (`result_id`) REFERENCES `results` (`result_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `routines`
--
ALTER TABLE `routines`
  ADD CONSTRAINT `fk_routines_admins1` FOREIGN KEY (`admin_created`) REFERENCES `admins` (`admin_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `routines_has_images`
--
ALTER TABLE `routines_has_images`
  ADD CONSTRAINT `fk_routines_has_images_images1` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_routines_has_images_routines1` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`routine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `fk_tests_admins1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tests_routines1` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`routine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tests_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_admins1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
