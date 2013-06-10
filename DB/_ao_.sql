-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Machine: 127.0.0.1
-- Genereertijd: 10 jun 2013 om 19:33
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
(1, 'stefaan.ch@gmail.com', 'wL39u6F0TZvlkb4Q1Y5zjPVodyc=', 'j6l/2OqSEBrHy1lY8WPkBkK2sTnkHfQdiIVbwggMvH4=', 'Stefaan', 'Christiaens', 'm', '2013-04-05 08:42:12', NULL, NULL, '2013-06-10 14:11:40');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `errors`
--

CREATE TABLE IF NOT EXISTS `errors` (
  `error_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `error_name` varchar(255) NOT NULL,
  PRIMARY KEY (`error_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Gegevens worden uitgevoerd voor tabel `errors`
--

INSERT INTO `errors` (`error_id`, `error_name`) VALUES
(1, 'Weglating finale consonant'),
(2, 'Weglating initiale consonant'),
(3, 'Clusterreductie'),
(4, 'Epenthesis'),
(5, 'Weglating onbeklemtoonde syllabe'),
(6, 'Coalescentie'),
(7, 'Fronting'),
(8, 'Backing'),
(9, 'Stopping'),
(10, 'Gliding'),
(11, 'Denasalsatie'),
(12, 'Verstemlozing'),
(13, 'Progressieve assimilatie'),
(14, 'Regressieve assimilatie'),
(15, 'Contactassimilatie'),
(16, 'Afstandassimilatie'),
(17, 'Reduplicatie door substitutie'),
(18, 'Reduplicatie door additie'),
(19, 'Metathesis'),
(20, 'Idiosyncratische en ongewone processen'),
(21, 'Addentaal'),
(22, 'Interdentaal');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=70 ;

--
-- Gegevens worden uitgevoerd voor tabel `images`
--

INSERT INTO `images` (`image_id`, `image_name`, `image_url`, `image_phonetic`, `image_sentence`, `image_soundurl`, `image_admin`, `image_createddate`, `image_modifieddate`) VALUES
(1, 'Wesp', 'd2VzcC5wbmcw.png', 'dwBFAHMAcAA=', 'Dit is geen bij, maar een ...', 'd2VzcC53YXY0NTM=.wav', 1, '2013-06-10 15:53:28', '2013-06-10 17:29:15'),
(2, 'Vork', 'dm9yay5wbmc5NzY=.png', 'dgDnAHIAawA=', 'Dit is geen lepel, maar een ...', 'dm9yay53YXY5NTU=.wav', 1, '2013-06-10 15:53:28', '2013-06-10 17:28:28'),
(3, 'Vliegtuig', 'dmxpZWd0dWlnLnBuZzkzOQ==.png', 'dgBsAGkALgBYAHQA+AB5AFgA', 'Hoog in de lucht zie ik een ...', 'dmxpZWd0dWlnLndhdjEyOQ==.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(4, 'Vissen', 'dmlzc2VuLnBuZzQ0Mg==.png', 'dgBJAHMAtABuAA==', 'Dit zijn veel ...', 'dmlzc2VuLndhdjkwMQ==.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(5, 'Trap', 'dHJhcC5wbmc5MzI=.png', 'dAByAEEAcAA=', 'Stap voor stap naar boven met de ...', 'dHJhcC53YXYzMQ==.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(6, 'Taart', 'dGFhcnQucG5nOTI0.png', 'dABhAC4AcgB0AA==', 'Het is feest en dan eten we ...', 'dGFhcnQud2F2ODg=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(7, 'Stofzuiger', 'c3RvZnp1aWdlci5wbmc5MTY=.png', 'cwB0AOcAZgB6APgAeQCSAbQAcgA=', 'Mama zuigt alle kruimels op met de ...', 'c3RvZnp1aWdlci53YXY5MA==.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(8, 'Spin', 'c3Bpbi5wbmc5MDE=.png', 'cwBwAEkAbgA=', 'In het web zit een ...', 'c3Bpbi53YXYxMzE=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(9, 'Soep', 'c29lcC5wbmc4ODg=.png', 'cwB1AHAA', 'Wat eet je met een lepel?', 'c29lcC53YXY5Nzk=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(10, 'Snoep', 'c25vZXAucG5nODgw.png', 'cwBuAHUAcAA=', 'Als beloning krijg ik soms ...', 'c25vZXAud2F2ODAx.wav', 1, '2013-06-10 15:53:28', '2013-06-10 17:26:09'),
(12, 'Sleutel', 'c2xldXRlbC5wbmc4NjA=.png', 'cwBsAPgAdAC0AGwA', 'Ik doe de deur op met mijn ...', 'c2xldXRlbC53YXYxMTU=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(13, 'Slang', 'c2xhbmcucG5nODIz.png', 'cwBsAEEATgA=', '"Sssss", sist de ...', 'c2xhbmcud2F2NjUy.wav', 1, '2013-06-10 15:53:28', '2013-06-10 17:24:55'),
(14, 'Sjaal', 'c2phYWwucG5nODE1.png', 'UwBhAC4AbAA=', 'Wat doe ik rond mijn nek als het koud is? Een ...', 'c2phYWwud2F2Njc0.wav', 1, '2013-06-10 15:53:28', '2013-06-10 17:24:26'),
(15, 'Schommel', 'c2Nob21tZWwucG5nODA4.png', 'cwBYAOcAbQC0AGwA', 'In de speeltuin staat een ...', 'c2Nob21tZWwud2F2MTk0.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(16, 'Raam', 'cmFhbS5wbmc3ODA=.png', 'cgBhAC4AbQA=', 'Ik kijk naar buiten door het ...', 'cmFhbS53YXY3MTY=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(17, 'Prik', 'cHJpay5wbmc3NTk=.png', 'cAByAEkAawA=', 'Bij de dokter krijg je soms een ...', 'cHJpay53YXYyNDk=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(18, 'Paddenstoel', 'cGFkZGVzdG9lbC5wbmc3NDU=.png', 'cABBAGQAtABzAHQAdQBsAA==', 'De kabouter woont in een ...', 'cGFkZGVuc3RvZWwud2F2MjQ0.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(19, 'Paard', 'cGFhcmQucG5nNzM4.png', 'cABhADoAcgB0AA==', 'Dit is geen ezel, maar een ...', 'cGFhcmQud2F2ODc2.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(20, 'Olifant', 'b2xpZmFudC5wbmc3MTA=.png', 'bwAuAGwASQBmAEEAbgB0AA==', 'Een groot dier met een slurf, dat is een ...', 'b2xpZmFudC53YXY1ODE=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(21, 'Neus', 'bmV1cy5wbmc3MDM=.png', 'bgBPAC4AcwA=', 'Tussen mijn ogen staat mijn ...', 'bmV1cy53YXY0Nzc=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(22, 'Muur', 'bXV1ci5wbmc2OTY=.png', 'bQB5ADoAcgA=', 'Met stenen metsel ik een grote ...', 'bXV1ci53YXYzNjk=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(23, 'Leeuwen', 'bGVldXdlbjIucG5nNjc0.png', 'bABlAC4AdwC0AG4A', 'Dit zijn twee ...', 'bGVldXdlbi53YXY2Mzg=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(24, 'Leeuw', 'bGVldXcucG5nNjU4.png', 'bABlAC4AdQA=', '"Grr", brult de ...', 'bGVldXcud2F2MTE=.wav', 1, '2013-06-10 15:53:28', '2013-06-10 17:19:22'),
(25, 'Lamp', 'bGFtcC5wbmc2NTA=.png', 'bABBAG0AcAA=', 'We maken licht met een ...', 'bGFtcC53YXY1Nzc=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(26, 'Kroon', 'a3Jvb24ucG5nNjM3.png', 'awByAG8ALgBuAA==', 'Wat draagt de koning op zijn hoofd? Dat is een ...', 'a3Jvb24ud2F2ODU=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(27, 'Kast', 'a2FzdC5wbmc2MjI=.png', 'awBBAHMAdAA=', 'Al mijn kleerdjes hangen in de ...', 'a2FzdC53YXY3NDg=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(29, 'Kaars', 'a2FhcnMucG5nNTky.png', 'awBhAC4AcgBzAA==', 'Op een verjaardagstaart staat een ...', 'a2FhcnMud2F2NTEz.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(30, 'Hond', 'aG9uZC5wbmc1NzY=.png', 'aADnAG4AdAA=', '"Waf waf", zegt de ...', 'aG9uZC53YXYyODM=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(31, 'Hemd', 'aGVtZC5wbmc1NTI=.png', 'aABFAG0AdAA=', 'Dit is geen trui, maar een ...', 'aGVtZC53YXY2OA==.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(32, 'Helm', 'aGVsbTIucG5nNTQ1.png', 'aABFAGwAbQA=', 'Bob De Bouwer draagt een ...', 'aGVsbS53YXYzNzk=.wav', 1, '2013-06-10 15:53:28', '2013-06-10 17:16:30'),
(33, 'Heks', 'aGVrcy5wbmc1MzE=.png', 'aABFAGsAcwA=', 'Wie vliegt er op een bezem? Dat is een ...', 'aGVrcy53YXY4OTk=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(34, 'Glas', 'Z2xhcy5wbmc1MTA=.png', 'kgFsAEEAcwA=', 'Ik drink water uit een ...', 'Z2xhcy53YXYyOTk=.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(35, 'Gitaar', 'Z2l0YWFyLnBuZzUwMg==.png', 'kgFpAHQAYQA6AHIA', 'Ik maak muziek met een ...', 'Z2l0YWFyLndhdjc2MA==.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(36, 'Giraf', 'Z2lyYWYucG5nNDg3.png', 'WgBJAHIAQQBmAA==', 'Dit dier heeft een lange nek. Dit is een ...', 'Z2lyYWYud2F2NDQ3.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(37, 'Garage', 'Z2FyYWdlLnBuZzQ3Mg==.png', 'kgFBAHIAYQBaALQA', 'Papa zet de auto in de ...', 'Z2FyYWdlLndhdjU3MA==.wav', 1, '2013-06-10 15:53:28', '0001-01-01 00:00:00'),
(38, 'Frietjes', 'ZnJpZXRlbi5wbmc0NjQ=.png', 'ZgByAGkALgB0AGoAtABzAA==', 'Mmm, ik eet altijd mayonaise op mijn ...', 'ZnJpZXRqZXMud2F2NjUy.wav', 1, '2013-06-10 15:53:28', '2013-06-10 17:13:50'),
(39, 'Fles', 'Zmxlcy5wbmc0NDQ=.png', 'ZgBsAEUAcwA=', 'Limonade zit in een ...', 'Zmxlcy53YXY1MzA=.wav', 1, '2013-06-10 15:53:29', '0001-01-01 00:00:00'),
(40, 'Fiets', 'ZmlldHMucG5nNDM3.png', 'ZgBpAC4AdABzAA==', 'Ik rij graag op mijn ...', 'ZmlldHMud2F2ODUy.wav', 1, '2013-06-10 15:53:29', '0001-01-01 00:00:00'),
(41, 'Ezel', 'ZXplbC5wbmc0MTc=.png', 'ZQB6ALQAbAA=', 'Dit is geen paard, maar een ...', 'ZXplbC53YXY5MTk=.wav', 1, '2013-06-10 15:53:29', '2013-06-10 17:12:24'),
(42, 'Vriendje', 'dnJpZW5kamVzLnBuZzk4Mw==.png', 'dgByAGkAbgB0AGoAtAA=', 'Ik speel graag samen met dat kindje, dat is mijn ...', 'dnJpZW5kamUud2F2MTMz.wav', 1, '2013-06-10 15:53:29', '2013-06-10 17:28:43'),
(43, 'Bril', 'YnJpbC5wbmc0MDk=.png', 'YgByAEkAbAA=', 'Oma kan beter zien met een ...', 'YnJpbC53YXY1NTc=.wav', 1, '2013-06-10 15:53:29', '2013-06-10 17:11:45'),
(44, 'Blokken', 'Ymxva2tlbi5wbmc0MDk=.png', 'YgBsAOcAawC0AG4A', 'Ik speel graag met ...', 'Ymxva2tlbi53YXYxMzA=.wav', 1, '2013-06-10 15:53:29', '0001-01-01 00:00:00'),
(45, 'Bank', 'QmFuay5wbmc5MDk=.png', 'YgBBAE4AawA=', 'In het park kunnen we gaan zitten op een ...', 'YmFuay53YXY1MjA=.wav', 1, '2013-06-10 15:53:29', '0001-01-01 00:00:00'),
(46, 'Banaan', 'YmFuYWFuLnBuZzkwOA==.png', 'YgBBAG4AYQAuAG4A', 'Ik pel de ...', 'YmFuYWFuLndhdjE2Mg==.wav', 1, '2013-06-10 15:53:29', '0001-01-01 00:00:00'),
(47, 'Arm', 'YXJtLnBuZzQxMA==.png', 'QQByAG0A', 'Dit is mijn ...', 'YXJtLndhdjQ1MQ==.wav', 1, '2013-06-10 15:53:29', '2013-06-10 17:07:57'),
(48, 'Deur', 'ZGV1ci5wbmc5MTA=.png', 'ZABPADoAcgA=', 'Ik ga naar buiten langs de ...', 'ZGV1ci53YXY3MTQ=.wav', 1, '2013-06-10 15:53:29', '0001-01-01 00:00:00'),
(49, 'Wafels', 'd2FmZWxzLnBuZzk5MQ==.png', 'dwBhAC4AZgC0AGwAcwA=', 'Mama heeft iets lekker gebakken. Het zijn ...', 'd2FmZWxzLndhdjQxNQ==.wav', 1, '2013-06-10 15:53:30', '2013-06-10 17:29:02'),
(50, 'Wolf', 'd29sZi5wbmc0MA==.png', 'dwDnAGwAZgA=', 'Dit is geen hond, maar een gevaarlijke ...', 'd29sZi53YXY3Nzg=.wav', 1, '2013-06-10 15:53:30', '2013-06-10 17:29:49'),
(51, 'Zeven', 'emV2ZW4ucG5nNTc=.png', 'egBlAC4AdgC0AG4A', 'Een, twee, drie, vier, vijf, zes, ...', 'emV2ZW4ud2F2MTI4.wav', 1, '2013-06-10 15:53:31', '2013-06-10 17:30:11'),
(52, 'Rups', 'cnVwcy5wbmc2NzQ=.png', 'cgD4AHAAcwA=', 'Dit beestje eet graag blaadjes. Het is een ...', 'cnVwcy53YXY2MQ==.wav', 1, '2013-06-10 16:12:54', '0001-01-01 00:00:00'),
(53, 'Meisje', 'bWVpc2plLmdpZjg3OA==.gif', 'bQBlAC4ASQBTALQA', 'Dat is geen jongen, dat is een ...', 'bWVpc2plLndhdjUxMw==.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(54, 'Lacht', 'bGFjaHQuZ2lmODQx.gif', 'bABBAFgAdAA=', 'Dit kindje weent niet, het ...', 'bGFjaHQud2F2ODIx.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(55, 'Lachen', 'bGFjaGVuLmdpZjgzMQ==.gif', 'bABBAFgAtABuAA==', 'Deze kindjes zijn niet aan het wenen. Ze zijn aan het ...', 'bGFjaGVuLndhdjY2Mw==.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(56, 'Knippen', 'a25pcHBlbi5naWY3NTA=.gif', 'awBuAEkAcAC0AG4A', 'Met een schaar kan je ...', 'a25pcHBlbi53YXY3NDk=.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(57, 'Klein', 'a2xlaW4uZ2lmMjIx.gif', 'awBsAEUAaQBuAA==', 'Papa is groot en het kindje is ...', 'a2xlaW4ud2F2NjQ1.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(58, 'Jongen', 'am9uZ2VuMi5naWY3MTA=.gif', 'agDnAE4AtABuAA==', 'Dat is geen meisje. Dat is een ...', 'am9uZ2VuLndhdjM0MA==.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(59, 'Hangt', 'aGFuZ3QyLmdpZjE2Nw==.gif', 'aABBAE4AdAA=', 'Wat doet de kapstok aan het touw? Het ...', 'aGFuZ3Qud2F2MzMy.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(60, 'Groot', 'Z3Jvb3QuZ2lmNjg3.gif', 'kgFyAG8ALgB0AA==', 'Het kindje is klein en papa is ...', 'Z3Jvb3Qud2F2MzQ5.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(61, 'Dwerg', 'ZHdlcmcuZ2lmNjY3.gif', 'ZAB3AEUAcgBYAA==', 'Wie staat bij Sneeuwwitje? Dat is een ...', 'ZHdlcmcud2F2MjE4.wav', 1, '2013-06-10 17:07:19', '2013-06-10 17:12:13'),
(62, 'Drinken', 'ZHJpbmtlbi5naWYxOTI=.gif', 'ZAByAEkATgBrALQAbgA=', 'Die meisjes hebben dorst. Ze zijn aan het ...', 'ZHJpbmtlbi53YXY3NDA=.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(63, 'Blaft', 'YmxhZnQuZ2lmNjYz.gif', 'YgBsAEEAZgB0AA==', '"Waf waf". De hond ...', 'YmxhZnQud2F2OTIx.wav', 1, '2013-06-10 17:07:19', '0001-01-01 00:00:00'),
(64, 'Wolk', 'd29sa2VuLmdpZjI1.gif', 'dwDnAGwAawA=', 'Boven in de lucht zie ik een ..', 'd29say53YXY4NTk=.wav', 1, '2013-06-10 17:07:20', '0001-01-01 00:00:00'),
(65, 'Zwaaien', 'endhYWllbi5naWYzNg==.gif', 'egB3AGEALgBqALQAbgA=', 'Wat doen ze met hun handje? Ze ...', 'endhYWllbi53YXY2MzM=.wav', 1, '2013-06-10 17:07:20', '0001-01-01 00:00:00'),
(66, 'Valt', 'dmFsdC5naWYxNQ==.gif', 'dgBBAGwAdAA=', 'Oei! De bal ...', 'dmFsdC53YXY5MjA=.wav', 1, '2013-06-10 17:07:20', '0001-01-01 00:00:00'),
(67, 'Plakken', 'cGxha2tlbi5naWY2.gif', 'cABsAEEAawC0AG4A', 'Ik laat deze foto aan de muur ...', 'cGxha2tlbi53YXY5OTE=.wav', 1, '2013-06-10 17:07:20', '2013-06-10 17:23:28'),
(68, 'Likt', 'bGlrLmdpZjg1MQ==.gif', 'bABJAGsAdAA=', 'Wat doet dit hondje met zijn tong? Het ...', 'bGlrdC53YXY2NDA=.wav', 1, '2013-06-10 17:07:21', '0001-01-01 00:00:00'),
(69, 'Smurf', 'U211cmYyLnBuZzEzOQ==.png', 'cwBtAPgAcgBmAA==', 'Blauw met een witte muts, dat is een ...', 'c211cmYud2F2NzEy.wav', 1, '2013-06-10 17:10:30', '0001-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `results`
--

CREATE TABLE IF NOT EXISTS `results` (
  `result_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `test_order` int(11) DEFAULT NULL,
  `result_audiosource` varchar(255) DEFAULT NULL,
  `result_phonetic` varchar(255) DEFAULT NULL,
  `result_value` tinyint(1) DEFAULT NULL,
  `test_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`result_id`),
  KEY `fk_results_tests1_idx` (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `results_has_errors`
--

CREATE TABLE IF NOT EXISTS `results_has_errors` (
  `result_id` bigint(20) NOT NULL,
  `error_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`result_id`,`error_id`),
  KEY `fk_results_has_errors_errorcategories1_idx` (`error_id`)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
  `test_comment` mediumtext,
  `test_forstatistics` tinyint(1) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Beperkingen voor gedumpte tabellen
--

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
  ADD CONSTRAINT `fk_results_has_errors_results1` FOREIGN KEY (`result_id`) REFERENCES `results` (`result_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_results_has_errors_errorcategories1` FOREIGN KEY (`error_id`) REFERENCES `errors` (`error_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
