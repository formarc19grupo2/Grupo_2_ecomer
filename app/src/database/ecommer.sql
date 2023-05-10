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
    ) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    /*!40101 SET character_set_client = @saved_cs_client */;

    --
    -- Dumping data for table `products`
    --

    LOCK TABLES `products` WRITE;
    /*!40000 ALTER TABLE `products` DISABLE KEYS */;
    INSERT INTO `products` VALUES (103,'Panini',2000,20,'Pan',1,'2023-04-21 14:13:16','2023-04-21 14:13:16'),(104,'TOMATO',300,10,'TOMATO',2,'2023-04-21 14:13:44','2023-04-21 14:13:44'),(105,'Lechuga',500,10,'sin',2,'2023-04-21 14:17:03','2023-04-21 14:17:03'),(106,'Medialuna',4000,20,'Medialuna rellena con pollo y vegetales ',1,'2023-04-21 14:41:20','2023-04-21 14:41:20'),(107,'Ganache ',500,10,'POSTRE DE CHOCOLATE',7,'2023-04-21 14:43:26','2023-04-21 14:43:26'),(108,'Alfajores de maicena',50,5,'Alfajores de Maicena',7,'2023-04-21 15:24:41','2023-04-21 15:24:41'),(109,'CocaCola',500,10,'Coca Cola',5,'2023-04-21 15:27:10','2023-04-21 15:27:10'),(110,'Sprite',500,5,'Sprite',5,'2023-04-21 15:27:55','2023-04-21 15:27:55'),(111,'Agua saborizada',500,5,'Aguas',5,'2023-04-21 15:29:14','2023-04-21 15:29:14');
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
    ) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    /*!40101 SET character_set_client = @saved_cs_client */;

    --
    -- Dumping data for table `products_images`
    --

    LOCK TABLES `products_images` WRITE;
    /*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
    INSERT INTO `products_images` VALUES (47,'1682086396704_img_.png',103),(48,'1682086424950_img_.png',104),(49,'1682086623536_img_.png',105),(50,'1682088080666_img_.jpg',106),(51,'1682088206677_img_.jpg',107),(52,'1682090681684_img_.jpg',108),(53,'1682090830796_img_.jpg',109),(54,'1682090875693_img_.jpg',110),(55,'1682090954947_img_.jpg',111),(56,'1682090954947_img_.jpg',111),(57,'1682090954947_img_.jpg',111);
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
    ) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    /*!40101 SET character_set_client = @saved_cs_client */;

    --
    -- Dumping data for table `users`
    --

    LOCK TABLES `users` WRITE;
    /*!40000 ALTER TABLE `users` DISABLE KEYS */;
    INSERT INTO `users` VALUES (17,'admin','admin','admin@mail.com','$2a$10$g9YXAsgvDDsFzEkSsqi3Fes8e/9mvviTSUYTs13llZf/5/YwpVncO','15151515',1,'2021-09-24 02:05:57','2023-04-21 14:38:43','1682087891216_avatar_.jpeg'),(18,'Jona2','Cespedes','user@mail.com','$2a$10$7kyZVLMgCjjfx1k123cKtelWFTc0XgNoBBOLDPeePAnU8IXiXVF4e',NULL,1,'2021-11-10 22:35:54','2021-11-10 22:35:54','default-image.png'),(19,'lucas','monsores','lucas@gmail.com','$2a$12$YlHoCi9VlqNqWwQMcvXH6e0jSN4g0U.S0556NK.JrpTapepgc2vX2','',1,'2023-04-17 04:28:04','2023-04-17 04:28:04','default-image.png'),(20,'oscar','oscar2','oscar@gmail.com','$2a$12$HZrcRzt8JxIOT2ALIvanmOpXjFnz/bsK2najiPtBBegfspJfkz59G','',0,'2023-04-17 16:12:57','2023-04-17 16:12:57','default-image.png'),(21,'lucas3','monsores3','lucas3@gmail.com','$2a$12$801J60gKRLd6FeSQGyf.lukVa3HzbYzw96PIP9lXtC9i5n7lubS3m','',0,'2023-04-17 19:24:02','2023-04-17 19:24:02','default-image.png'),(22,'oscar','chacoma','oscar@mail.com','$2a$12$j1GwJdrep5sBIYOcchMpYOJ.9QCAJynf2QEvb8le0D2g0Ri9xNcEm','',1,'2023-04-17 21:18:02','2023-04-21 14:37:34','1682087854380_avatar_.jpg'),(23,'admin','admin','admin@mail.com','$2a$12$8y542dxF..gH.TjnIr8fR.f3Nb2JmwnKYVj/EQOSHshs347ikeXdK','',1,'2023-04-21 13:57:13','2023-04-21 13:57:13','1682085433179_avatar_.jpg');
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

    -- Dump completed on 2023-04-21 12:35:39
