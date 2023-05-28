-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommer
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `banner` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sandwich','cat_escolar.jpg'),(2,'Bebidas','cat_artistica.jpg'),(3,'Postres','cat_oficina.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_items_un` (`id`),
  KEY `order_items_FK` (`productId`),
  KEY `order_items_FK_1` (`orderId`),
  CONSTRAINT `order_items_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `order_items_FK_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `state` varchar(100) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_un` (`id`),
  KEY `orders_FK` (`userId`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `subcategory_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `subcategory_idx` (`subcategory_id`),
  CONSTRAINT `subcategory` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (104,'TOMATO2',3003,13,'TOMATO aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadasd',2,'2023-04-21 14:13:44','2023-05-14 22:16:30'),(105,'Lechuga',500,10,'La lechuga es una hortaliza verde, crujiente y refrescante.\r\n\r\n\r\n\r\n',2,'2023-04-21 14:17:03','2023-05-14 23:02:20'),(106,'Medialuna',4000,20,'Las medialunas son unos bollos de masa de hojaldre con forma de media luna, típicos de la gastronomía argentina y uruguaya.',1,'2023-04-21 14:41:20','2023-05-14 23:01:03'),(108,'Alfajores de maicena',50,5,'Alfajores de Maicena',7,'2023-04-21 15:24:41','2023-04-21 15:24:41'),(109,'CocaCola',500,10,'Coca-Cola es una bebida carbonatada y refrescante con sabor a cola. Fue inventada en 1886 por el farmacéutico John Pemberton en Atlanta, Estados Unidos, y desde entonces se ha convertido en una de las bebidas más populares y reconocidas en todo el mundo. La Coca-Cola se elabora a partir de una mezcla secreta de ingredientes naturales, que incluyen extractos de hojas de coca y nuez de cola, y se envasa en botellas o latas para su distribución y venta en todo el mundo. Su sabor dulce y burbujeante la convierte en una opción popular para acompañar comidas y para refrescarse en cualquier momento del día',5,'2023-04-21 15:27:10','2023-05-14 22:41:01'),(110,'Sprite',500,5,'Sprite',5,'2023-04-21 15:27:55','2023-04-21 15:27:55'),(111,'Agua saborizada',500,5,'Aguas',5,'2023-04-21 15:29:14','2023-04-21 15:29:14'),(112,'Bacon',2000,0,'Panes rellenos de huevo bacón y queso, un bocadillo suculento que tendrás preparado en apenas 10 minutos. Estos irresistibles panes rellenos son el sumun del bocadillo, una cena o una merienda de quitarse el sobrero, además de ricos son muy aparentes y puedes aprovecharlos para sorprender a tus amigos en una cena de picoteo.',3,'2023-05-28 22:21:17','2023-05-28 22:21:17'),(113,'Broker',3000,0,'Sándwich Broker, energía necesaria para el comienzo de marzo',3,'2023-05-28 22:23:23','2023-05-28 22:23:23'),(115,'Pig Pig',1800,5,'Miss Pig es un monumento al sabor',3,'2023-05-28 22:26:55','2023-05-28 22:26:55'),(116,'Montt',3000,0,'Sándwich Montt una exquisita alternativa ahumada que te hará volar por nuestro país',2,'2023-05-28 22:28:42','2023-05-28 22:28:42'),(117,'Pig Kids',2000,10,'Disfruta el fin de semana con los más peques y las divertidas alternativas Kids',4,'2023-05-28 22:30:49','2023-05-28 22:30:49'),(118,'Postre torta',1000,0,'Bizcochuelo, dulce de leche con nuez y crema con duraznos\r\nEXQUISITO',7,'2023-05-28 22:34:17','2023-05-28 22:34:17'),(119,'Tarta de queso',2000,5,'1 tarrina de queso philadelphia, 2 brick de 250 ml de nata, 6 cucharadas de azucar',7,'2023-05-28 22:37:27','2023-05-28 22:37:27'),(120,'Flan de chocolate',1500,0,'Flan de chocolate negro y blanco',7,'2023-05-28 22:38:53','2023-05-28 22:38:53'),(121,'Flan de huevo',1500,0,'flan de huevo casero',7,'2023-05-28 22:40:22','2023-05-28 22:40:22'),(122,'Frutos del bosque',2000,5,'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto fina',7,'2023-05-28 22:41:28','2023-05-28 22:41:28'),(123,'Rocus',2000,10,'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto fina',3,'2023-05-28 22:43:26','2023-05-28 22:43:26'),(124,'Frutos del bosque',700,0,'Tragos sin alcohol tragos sin alcohol tragos sin alcohol tragos sin alcohol',5,'2023-05-28 22:45:16','2023-05-28 22:45:16'),(126,'Sodaa',380,0,'Soda Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto fina',5,'2023-05-28 22:48:18','2023-05-28 22:48:18'),(127,'Secco',500,0,'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto fina',5,'2023-05-28 22:49:24','2023-05-28 22:57:11');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_images_FK` (`product_id`),
  CONSTRAINT `products_images_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (49,'1682086623536_img_.png',105),(50,'1682088080666_img_.jpg',106),(52,'1682090681684_img_.jpg',108),(53,'1682090830796_img_.jpg',109),(54,'1682090875693_img_.jpg',110),(55,'1682090954947_img_.jpg',111),(56,'1682090954947_img_.jpg',111),(57,'1682090954947_img_.jpg',111),(61,'1683732495716_img_.jpg',104),(62,'1685312477798_img_.jpg',112),(63,'1685312603295_img_.jpg',113),(65,'1685312815807_img_.jpg',115),(66,'1685312922084_img_.jpg',116),(67,'1685313049715_img_.jpg',117),(68,'1685313257947_img_.jpg',118),(69,'1685313447906_img_.jpg',119),(70,'1685313533635_img_.jpg',120),(71,'1685313622701_img_.jpg',121),(72,'1685313688398_img_.jpg',122),(73,'1685313806966_img_.jpg',123),(74,'1685313916092_img_.png',124),(76,'1685314098865_img_.png',126),(78,'1685314631102_img_.jpg',127);
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoria_idx` (`category_id`),
  CONSTRAINT `categoria` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Pebetes comunes',1,NULL,NULL),(2,'Veganos',1,NULL,NULL),(3,'XXL',1,NULL,NULL),(4,'Infantiles',1,NULL,NULL),(5,'Gaseosas',2,NULL,NULL),(6,'Helados',3,NULL,NULL),(7,'Postres comunes',3,NULL,NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'admin','admin','admin@mail.com','$2a$10$g9YXAsgvDDsFzEkSsqi3Fes8e/9mvviTSUYTs13llZf/5/YwpVncO','15151515',1,'2021-09-24 02:05:57','2023-04-21 14:38:43','1682087891216_avatar_.jpeg'),(18,'Jona2','Cespedes','user@mail.com','$2a$10$7kyZVLMgCjjfx1k123cKtelWFTc0XgNoBBOLDPeePAnU8IXiXVF4e',NULL,1,'2021-11-10 22:35:54','2021-11-10 22:35:54','default-image.png'),(19,'lucas','monsores','lucas@gmail.com','$2a$12$YlHoCi9VlqNqWwQMcvXH6e0jSN4g0U.S0556NK.JrpTapepgc2vX2','',1,'2023-04-17 04:28:04','2023-04-17 04:28:04','default-image.png'),(21,'lucas3','monsores3','lucas3@gmail.com','$2a$12$801J60gKRLd6FeSQGyf.lukVa3HzbYzw96PIP9lXtC9i5n7lubS3m','',0,'2023-04-17 19:24:02','2023-04-17 19:24:02','default-image.png'),(22,'oscar','chacoma','oscar@mail.com','$2a$12$j1GwJdrep5sBIYOcchMpYOJ.9QCAJynf2QEvb8le0D2g0Ri9xNcEm','',1,'2023-04-17 21:18:02','2023-04-21 14:37:34','1682087854380_avatar_.jpg'),(23,'admin','admin','admin@mail.com','$2a$12$8y542dxF..gH.TjnIr8fR.f3Nb2JmwnKYVj/EQOSHshs347ikeXdK','',1,'2023-04-21 13:57:13','2023-04-21 13:57:13','1682085433179_avatar_.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ecommer'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-28 20:38:40
