-- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: restaurant-manager
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cash_registers`
--

DROP TABLE IF EXISTS `cash_registers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cash_registers` (
  `idCashRegister` int(11) NOT NULL AUTO_INCREMENT,
  `idComercial` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hora_inicio` time NOT NULL,
  `hora_final` time NOT NULL,
  `saldo_inicial` double NOT NULL,
  `saldo_final` double NOT NULL,
  `total` double NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idCashRegister`),
  KEY `cash_registers_FK` (`idComercial`),
  CONSTRAINT `cash_registers_FK` FOREIGN KEY (`idComercial`) REFERENCES `commercials` (`idComercial`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_registers`
--

LOCK TABLES `cash_registers` WRITE;
/*!40000 ALTER TABLE `cash_registers` DISABLE KEYS */;
/*!40000 ALTER TABLE `cash_registers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(100) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Desayuno',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Almuerzo',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Cena',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'Postres',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'Comida rápida',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,'Bebidas',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,'Comidas tradicionales',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,'Especiales de la casa',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,'Especial del dia',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commercials`
--

DROP TABLE IF EXISTS `commercials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commercials` (
  `idComercial` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `ubicacion` text NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idComercial`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commercials`
--

LOCK TABLES `commercials` WRITE;
/*!40000 ALTER TABLE `commercials` DISABLE KEYS */;
INSERT INTO `commercials` VALUES (1,'Sucursal Santa rosa','Santa rosa de lima','2345-4321',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Sucursal San miguel','San miguel','1234-7890',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Sucursal Berlin','Berlin, Usulutan','6432-7853',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `commercials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `idEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `idComercial` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `url` text DEFAULT NULL,
  `password` text NOT NULL,
  `username` varchar(100) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idEmpleado`),
  KEY `employees_FK` (`idComercial`),
  KEY `employees_FK_1` (`idRol`),
  CONSTRAINT `employees_FK` FOREIGN KEY (`idComercial`) REFERENCES `commercials` (`idComercial`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employees_FK_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,1,3,21,'1234-5678','San  miguel','ale@gmail.com','Jose Alejandro','Martinez','','123','ale27',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,1,1,21,'1234-5678','San  miguel','miguel@gmail.com','Miguel Alfredo','Torres','','123','ale27',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,1,5,18,'1234-5678','Ninguna','marlon@gmail.com','Marlon Coreas','Coreas','','123','coreas32',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,1,4,21,'1234-5678','Ninguna','salsedo@gmail.com','Carlos jose','Salsedo','','123','salsedo21',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,1,2,23,'1234-5678','San Marcos','roberth@gmail.com','Roberto antonio','Ruiz','','123','rober22',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,2,3,18,'1234-5678','Ninguna','pedro@gmail.com','Pedro','Vazques','','123','pedro32',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,2,4,21,'1234-5678','Ninguna','juan@gmail.com','Juan','Alvarado','','123','juan21',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,2,5,23,'1234-5678','San Marcos','luis@gmail.com','Luis','Parado','','123','luis22',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_items` (
  `id_menu_item` int(11) NOT NULL AUTO_INCREMENT,
  `idCategoria` int(11) NOT NULL,
  `idComercial` int(11) NOT NULL,
  `nombre_item` varchar(100) NOT NULL,
  `precio` double NOT NULL,
  `disponibilidad` tinyint(1) NOT NULL DEFAULT 1,
  `detalles_item` text NOT NULL,
  `descuento` float NOT NULL DEFAULT 0,
  `url` text DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_menu_item`),
  KEY `menu_items_FK_1` (`idComercial`),
  KEY `menu_items_FK` (`idCategoria`),
  CONSTRAINT `menu_items_FK` FOREIGN KEY (`idCategoria`) REFERENCES `categories` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_items_FK_1` FOREIGN KEY (`idComercial`) REFERENCES `commercials` (`idComercial`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,5,1,'Hamburguesa al carbón',5,1,'Carne al carbon, lechuga, tomates, pepinillos, queso cheddar y cebolla',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,5,1,'Papas fritas',1,1,'Tradicionales papas fritas',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,5,1,'Burrito',1.5,0,'Burrito con carne asada, tomates, ajo, pimientos rojos y cebolla',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,2,1,'Sopa de frijoles blancos',5,1,'Frijoles blancos con una costilla de cerdo, ajo, Yuca, repollo, pipianes y platanos',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,6,1,'Cocacola',1,1,'Cocacola tradicional',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,6,1,'Licuado de galletas',1,0,'Licuado con galletas hora, crema batida y leche',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,4,1,'Helado de chocolate',1.5,1,'Helado de chocolate con pedazos de galleta',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,8,1,'Cipitio',2.5,1,'Carne en trozos con tomates, lechaga, ajo, tomate y queso parmesano ',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,7,1,'Pupusas de queso',1,1,'Pupusa tradicional de queso',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,7,1,'Pupusas con loroco',1,1,'Pupusa tradicional de queso y loroco',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(11,7,1,'Pupusas revueltas',1,1,'Pupusa con queso mozzarella, pollo, cebolla, pimiento y tomate',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(12,6,1,'Horchata',1,1,'Bebida de horchata',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(13,5,1,'Alitas',10,1,'20 alitas de pollo con salsa picante',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(14,1,1,'Omelette',10,1,'Omelette con cebolla, cilandro, tomate, chile y pimienta',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(15,1,1,'Platano frito',10,1,'Una porcion de platano frito',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(16,1,1,'Tamal de elote frito',10,1,'Un tomal de elote frito',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(17,1,1,'Frijoles al casamiento',10,1,'Frijoles con arroz, chile y cebolla',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(18,2,1,'Ensalada de pollo',10,1,'Ensalada con pollo, vegetales y mayonesa',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(19,2,1,'Lasañade carne',10,1,'Lasañade de carne molida, cebolla, ajo, Queso mozzarella y Parmesano rallado',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(20,2,1,'Sopa de pollo y vegetales',10,1,'Caldo de pollo con vegetales',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(21,3,1,'Pollo a la plancha con verduras al vapor',10,1,'Pollo la plancha acompañado con verduras al vapor',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(22,3,1,'Pez espada',10,1,'Pescado con Queso parmesano, Pan rallado y Pimienta negra molida',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(23,1,1,'Sándwich',10,1,'Sándwich de jamon con lechuga, tomate y Queso Mozzarella',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(24,5,2,'Hamburguesa al carbón',5,1,'Carne al carbon, lechuga, tomates, pepinillos, queso cheddar y cebolla',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(25,5,2,'Papas fritas',1,1,'Tradicionales papas fritas',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(26,6,2,'Licuado de galletas',1,1,'Licuado con galletas hora, crema batida y leche',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(27,4,2,'Helado de chocolate',1.5,1,'Helado de chocolate con pedazos de galleta',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(28,8,2,'Cipitio',2.5,1,'Carne en trozos con tomates, lechaga, ajo, tomate y queso parmesano ',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(29,7,2,'Pupusas de queso',1,1,'Pupusa tradicional de queso',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(30,7,2,'Pupusas con loroco',1,1,'Pupusa tradicional de queso y loroco',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(31,7,2,'Pupusas revueltas',1,1,'Pupusa con queso mozzarella, pollo, cebolla, pimiento y tomate',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(32,6,2,'Horchata',1,1,'Bebida de horchata',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(33,5,2,'Alitas',10,1,'20 alitas de pollo con salsa picante',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(34,1,2,'Tamal de elote frito',10,1,'Un tomal de elote frito',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(35,1,2,'Frijoles al casamiento',10,1,'Frijoles con arroz, chile y cebolla',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(36,2,2,'Ensalada de pollo',10,1,'Ensalada con pollo, vegetales y mayonesa',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(37,3,2,'Pollo a la plancha con verduras al vapor',10,1,'Pollo la plancha acompañado con verduras al vapor',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(38,3,2,'Pez espada',10,1,'Pescado con Queso parmesano, Pan rallado y Pimienta negra molida',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(39,1,2,'Sándwich',10,1,'Sándwich de jamon con lechuga, tomate y Queso Mozzarella',0,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `idOrderDetail` int(11) NOT NULL AUTO_INCREMENT,
  `idOrden` int(11) NOT NULL,
  `id_menu_item` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `importe` double NOT NULL,
  `comentario` text DEFAULT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idOrderDetail`),
  KEY `order_details_FK` (`idOrden`),
  KEY `order_details_FK_1` (`id_menu_item`),
  CONSTRAINT `order_details_FK` FOREIGN KEY (`idOrden`) REFERENCES `orders` (`idOrden`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_details_FK_1` FOREIGN KEY (`id_menu_item`) REFERENCES `menu_items` (`id_menu_item`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (26,1,5,5,15,'',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(27,1,10,5,35,'Sin curtido',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(28,3,4,5,10,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(29,3,5,3,15,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(30,6,6,3,15,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(31,3,9,5,5,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(32,2,7,5,10,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(33,2,4,5,10,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(34,4,4,3,6,'',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(35,4,7,4,10,'',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(36,5,6,2,10,'',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(37,5,2,3,15,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(38,6,7,2,5,'',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(39,7,1,2,10,'Una sin cebolla',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(40,7,2,2,2,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(41,8,18,4,40,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(42,8,19,3,30,'Sin pan',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(43,9,14,2,20,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(44,9,23,1,10,'Sin tomate',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(45,10,15,3,30,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(46,10,16,1,10,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(47,10,17,1,10,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(48,11,9,8,8,'',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(49,11,11,4,4,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(50,11,29,2,2,'SIn curtido',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(51,12,18,1,10,'Sin tomate',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(52,12,19,2,20,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(53,13,5,4,4,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(54,13,12,2,2,'Una sin hielo',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(55,14,1,2,10,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(56,14,2,2,2,'',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(57,15,5,3,3,'Una de dieta',0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(58,16,7,2,3,'',1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `idOrden` int(11) NOT NULL AUTO_INCREMENT,
  `idEmpleado` int(11) NOT NULL DEFAULT 0,
  `idComercial` int(11) NOT NULL,
  `idMesa` int(11) DEFAULT NULL,
  `nombreCliente` varchar(100) NOT NULL,
  `fechaOrden` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `done` tinyint(1) NOT NULL DEFAULT 0,
  `pagado` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idOrden`),
  KEY `orders_FK` (`idEmpleado`),
  KEY `orders_FK_1` (`idComercial`),
  KEY `orders_FK_2` (`idMesa`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`idEmpleado`) REFERENCES `employees` (`idEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_FK_1` FOREIGN KEY (`idComercial`) REFERENCES `commercials` (`idComercial`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_FK_2` FOREIGN KEY (`idMesa`) REFERENCES `tables` (`idMesa`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3,1,1,'Juan Manuel','2021-10-23 04:20:31',0,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,3,1,NULL,'Jose Alejandro Ibanez','2021-10-23 04:20:21',1,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,4,1,NULL,'Jose Adolfo','2021-10-22 00:27:03',1,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,4,1,NULL,'Juan Ramirez','2021-10-21 22:46:50',0,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,4,1,NULL,'Luis Sanchez','2021-10-21 22:35:20',0,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,4,1,NULL,'Juan Carlos','2021-10-21 22:46:50',0,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,1,1,NULL,'Manuel Del Valle','2021-10-22 00:41:38',1,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,1,1,NULL,'Angel Torres','2021-10-22 00:41:21',1,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,1,1,NULL,'Jeft Rivas','2021-10-22 00:44:36',1,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,1,1,NULL,'Jose miguel','2021-10-22 00:28:06',1,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(11,1,1,NULL,'Pepe Torres','2021-10-21 23:44:34',0,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(12,1,1,4,'Juan Ramon','2021-10-23 10:41:06',0,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(13,1,1,NULL,'perez','2021-10-23 10:46:14',0,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(14,1,1,4,' Eduardo Sol','2021-10-23 04:59:24',1,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(15,1,1,8,'Todd Chabez','2021-10-23 10:59:11',0,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(16,1,1,NULL,'Luis Alvarado','2021-10-23 05:15:40',1,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `nombreRol` varchar(50) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Gerente',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Personal de cocina',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'Cajero',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'Mesero',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tables` (
  `idMesa` int(11) NOT NULL AUTO_INCREMENT,
  `idComercial` int(11) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `disponible` tinyint(1) NOT NULL,
  `numero` int(11) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idMesa`),
  KEY `tables_FK` (`idComercial`),
  CONSTRAINT `tables_FK` FOREIGN KEY (`idComercial`) REFERENCES `commercials` (`idComercial`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,1,4,1,1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,1,4,1,2,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,1,4,1,3,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,1,4,1,4,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,1,4,1,5,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,1,4,1,6,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,1,2,1,7,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,1,2,1,8,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,1,2,1,9,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,1,8,1,10,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxes`
--

DROP TABLE IF EXISTS `taxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taxes` (
  `idImpuesto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tasa_impuesto` float NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idImpuesto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxes`
--

LOCK TABLES `taxes` WRITE;
/*!40000 ALTER TABLE `taxes` DISABLE KEYS */;
INSERT INTO `taxes` VALUES (1,'iva',0.13,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `taxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `idOrden` int(11) NOT NULL,
  `total_sin_iva` double NOT NULL,
  `total_iva` double NOT NULL,
  `total` double NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`idTicket`),
  KEY `tickets_FK` (`idOrden`),
  CONSTRAINT `tickets_FK` FOREIGN KEY (`idOrden`) REFERENCES `orders` (`idOrden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,1,44.25,5.75,50,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,2,17.7,2.3,20,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,3,39.82,5.18,45,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-22 23:19:21
