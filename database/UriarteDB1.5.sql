-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: uriarte
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anotaciones_extra`
--

DROP TABLE IF EXISTS `anotaciones_extra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anotaciones_extra` (
  `idAnotacion` int NOT NULL AUTO_INCREMENT,
  `idPaciente` int DEFAULT NULL,
  `anotacion` text,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idAnotacion`),
  KEY `idPaciente` (`idPaciente`),
  CONSTRAINT `anotaciones_extra_ibfk_1` FOREIGN KEY (`idPaciente`) REFERENCES `formulario_registro_paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anotaciones_extra`
--

LOCK TABLES `anotaciones_extra` WRITE;
/*!40000 ALTER TABLE `anotaciones_extra` DISABLE KEYS */;
INSERT INTO `anotaciones_extra` VALUES (1,3,'El paciente presenta sintomas de Insolacion','2024-10-06 22:28:43'),(2,10,'Anotacion de prueba v1','2024-10-06 22:42:23'),(3,10,'Otra anotacion del paciente v2','2024-10-07 15:45:27'),(6,25,'los tratamientos, y fármacos van funcionando perfecto el organismo de este paciente. ','2024-10-17 20:29:02'),(7,26,'su tratamiento va mejorando.','2024-10-18 23:46:50'),(8,25,'esta paciente trajo los estudios estos día. para revisión del mismo. ','2024-10-19 00:02:22'),(9,27,'el paciente presentó dolencias en partes de su cuerpo, el mismo fue diagnosticado y necesita radiografías y demás. ','2024-10-21 20:17:07'),(10,27,'El paciente presenta mejoras con el tratamiento incorporado. Revisar las radiografías pedidas la semana pasada. y realizar nuevo diagnostico.','2024-10-21 20:20:11'),(11,28,'el paciente parece cansado','2024-10-24 15:53:38'),(12,28,'vino por primera vez','2024-10-24 15:54:21'),(13,28,'fiebre alta','2024-10-24 15:56:02'),(14,1,'hola','2024-10-27 03:00:00'),(15,1,'esta bien','2024-10-26 03:00:00'),(16,29,'julieta Pérez va mejorando en su tratamiento.  ','2024-10-27 03:00:00'),(17,29,'ingreso con problemas de cuerpo. ','2024-10-26 03:00:00'),(18,29,'su estado de ánimo está mejorando, de acuerdo a su salud que va mejorando a la misma ves. ','2024-10-27 03:00:00');
/*!40000 ALTER TABLE `anotaciones_extra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulta_paciente`
--

DROP TABLE IF EXISTS `consulta_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulta_paciente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `fecha` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `peso` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `altura` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `presion_arterial` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `diagnostico` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tratamiento` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `estudios_a_realizar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `motivo_visita` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `consulta_paciente_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `formulario_registro_paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta_paciente`
--

LOCK TABLES `consulta_paciente` WRITE;
/*!40000 ALTER TABLE `consulta_paciente` DISABLE KEYS */;
INSERT INTO `consulta_paciente` VALUES (1,2,'2024-07-14','110','185','31','Fiebre Alta','Reposo','Ergometria',''),(2,1,'2024-07-11','85','90','29','Hipertension','Pastillas','Rayos X',''),(3,2,'2024-07-10','110','90','32','Varicela','Remedio Recomendado','Analisis de Sangre',''),(4,10,'2024-07-11','93','176','31','Estres','Calmantes','Resonancia',''),(5,11,'2024-07-18','103','98','31','Hepatitis','Terapia','Analisis de Sangre',''),(6,12,'2024-07-16','93','89','29','Depresion','Pastillas','Analisis Psicologico',''),(7,8,'2024-07-17','72','81','30','Saludable','Ninguno','Chequeo de rutina',''),(8,13,'2024-07-18','63','2','28','no presenta ningún problema actual','ninguno','análisis',''),(9,14,'2024-07-18','76','170','0','peso ideal, grasas y demas perfect','dieta equilibrada','ninguno',''),(10,15,'2024-07-23','75','170','30','esta en perfecto estado. ','ninguno por el momento','análisis de sangre y orina.',''),(13,1,'2014-07-18','85','170','30','ninguno','análisis de sangre completo','ninguno por el momento',''),(14,17,'2014-07-28','80','170','30','depresión','yoga, meditación, ejercicio físico.','análisis completo',''),(15,19,'2024-07-30','87','170','30','resfrió congestión','paracetamol 2gr','ninguno',''),(16,3,'2024-10-05','131','89','29','Fiebre Baja','Reposo Absoluto','Chequeo Completo',''),(19,25,'2024-10-17','70','170','30','fiebre alta','paracetamol','ninguno',''),(20,26,'2024-10-18','70','120','30','fiebre alta','ninguno','ninguno',''),(21,27,'2024-10-21','76','160','30','Dolor muscular, en diferentes zonas del cuerpo.','cremas con antibiótico .','radiografias. ',''),(22,1,'2024-10-21','80','170','30','perfecto','ninguno','ninguno',''),(23,28,'2024-10-24','70','170','30','fiebre alta','nada','ninguno',''),(24,28,'2024-10-24','44','120','22','gg','gkg','aa',''),(25,1,'2024-10-27','70','170','30','na','na','na',''),(26,31,'2024-10-30','70','160','28','malestar muscular','analgésico y masajes','ninguno','dolor muscular'),(27,1,'2024-10-30','','','','fiebre alta','paracetamol 50mg','',''),(28,8,'2024-10-31','','','','fiebre alta','paracetamol','','');
/*!40000 ALTER TABLE `consulta_paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario_registro_paciente`
--

DROP TABLE IF EXISTS `formulario_registro_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formulario_registro_paciente` (
  `nombre` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `genero` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obra_social` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `correo_electronico` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `estado` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'habilitado',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario_registro_paciente`
--

LOCK TABLES `formulario_registro_paciente` WRITE;
/*!40000 ALTER TABLE `formulario_registro_paciente` DISABLE KEYS */;
INSERT INTO `formulario_registro_paciente` VALUES ('Jose','Perez','23513845',1,'masculino','OSDE','3857123456','jose.perez01@gmail.com','1994-03-18','Barrio Avenida Mza C Lote 16','habilitado'),('Maria','Gomez','38145934',2,'femenino','Naranja','3512456321','mary61@gmail.com','1998-11-02','Barrio Primera Junta','deshabilitado'),('Gabriela','Ramirez','23561234',3,'femenino','La Paz','3512983256','gabi23.rami@gmail.com','1978-12-03','Barrio Vinalar Calle 15','habilitado'),('Hector','Herrera','43678234',4,'masculino','OSDE','3563125734','hec_herrera@yahoo.com','1974-08-21','B Independencia Lote 15','habilitado'),('Estefania','Mendez','38345612',5,'femenino','Amarilla','3516254321','estefy_mendez@gmail.com','1998-09-16','Barrio Centro Mza 14 Lote 2','habilitado'),('Gisela','Argañaraz','23165355',7,'femenino','San Roque','3854162021','gise_arg@gmail.com','1972-12-03','Barrio Primera Junta Mza C Lot','Deshabilitado'),('Agustin','Toloza','34123123',8,'masculino','Peralta SA','3855768745','agus.toloza@gmail.com','1993-11-13','Barrio 1 de Mayo Mza D Lote 15','habilitado'),('Augusto','Palavecino','35124234',9,'masculino','OSDE','3855767634','palavecino.augus@gmail.com','1998-11-11','Barrio Villa Union 1315','habilitado'),('Pablo','Ledesma','31245123',10,'masculino','La Paz','351234123','pablo.led@yahoo.net','1996-05-11','Barrio Belgrano 2315','Deshabilitado'),('Luis','Avila','21651234',11,'masculino','Naranja','3856712312','luisav201@gmail.com','1976-10-19','Barrio Avenida Calle 103','habilitado'),('Ramiro','Arce','34237451',12,'masculino','La Paz','385908754','ramiro.arce@gmail.com','1987-11-23','Barrio Cabildo 131','habilitado'),('Bianca Ayelen','Maguna','39581933',13,'femenino','pami','13855829209','magunabianca07@gmail.com','1996-03-21','Laprida y solis','deshabilitado'),('juan','loto','16471906',14,'femenino','iosep','1647188','22ayelemagu20@gmail.com','1997-06-21','ingeniero volta','habilitado'),('Carlos Juan','Maguna','14428686',15,'masculino','profe','4253529','doctor@getdoctorino.com','1961-03-15','Tucuman 1780','habilitado'),('BianMagu','Maguna','371765471',17,'femenino','iosep','23435','magunabianca07@gmail.com','1997-03-21','Tucumán y Solís','Deshabilitado'),('Matias','Navarro','1237654399',19,'masculino','iosep','4231232','mati@gmail.com','2024-07-30','salta y solis','habilitado'),('Blanca','loto','16471906',25,'femenino','iosep','1234','Blanca20@gmail.com.ar','1991-01-11','carol19','habilitado'),('Juan','Maguna','223344',26,'femenino','iosep','1234','juan@gmail.com','2024-10-18','termas rio hondo','habilitado'),('Roberto','Manzur','2233775',27,'masculino','ospif','156432130','Robert20@gmail.com','1945-03-21','Maipu y rioja al 209','habilitado'),('Maria','Gonzales','20125125',28,'femenino','iosep','385123','Maria@gmail.com','1996-06-21','laprida 150','habilitado'),('Julieta','Perez','16732123',29,'femenino','iosep','332098','Julieta@gmail.com.ar','1991-06-27','Irigoyen 3030','habilitado'),('Julieta','Perez','16732123',30,'masculino','iosep','332098','Julieta@gmail.com.ar','2024-10-29','NNN','habilitado'),('Camila','Jacebeck','23452908',31,'femenino','iosep','4231120','camila21@gmail.com','1996-02-21','Irigoyen 100','habilitado');
/*!40000 ALTER TABLE `formulario_registro_paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inicio sesion`
--

DROP TABLE IF EXISTS `inicio sesion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inicio sesion` (
  `usuario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`usuario`(30))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio sesion`
--

LOCK TABLES `inicio sesion` WRITE;
/*!40000 ALTER TABLE `inicio sesion` DISABLE KEYS */;
/*!40000 ALTER TABLE `inicio sesion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modificar`
--

DROP TABLE IF EXISTS `modificar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modificar` (
  `telefono` int NOT NULL,
  `correo_electronico` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modificar`
--

LOCK TABLES `modificar` WRITE;
/*!40000 ALTER TABLE `modificar` DISABLE KEYS */;
/*!40000 ALTER TABLE `modificar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recuperar_contraseña`
--

DROP TABLE IF EXISTS `recuperar_contraseña`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recuperar_contraseña` (
  `imail` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`imail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recuperar_contraseña`
--

LOCK TABLES `recuperar_contraseña` WRITE;
/*!40000 ALTER TABLE `recuperar_contraseña` DISABLE KEYS */;
/*!40000 ALTER TABLE `recuperar_contraseña` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `usuario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `correo_electronico` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `confirmar_contraseña` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`usuario`(30))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES ('alucard','alucard@gmail.com','$2b$10$pKx5YlPvIRXUKpaX0/8ZauHf2o27fQf2BGRtoG2G67ffUXXt.YNh2','Alu.21'),('Ayelen','24Ayelen@gmail.com','$2b$10$NG4qHF8m8as0Dx5AM00bweszAppP0lyp5ASyzkWo60c3oPEYqW85W',''),('Bianca','magunabianca07@gmail.com','$2a$10$2PttUpCqN15L8cdgmYK7CeeIIz1CpsHRJ702OF3ciUd6fHBS2Jx.G',''),('BiancaN','Blanca21@gmail.com.ar','$2b$10$EHANKXbNpIzhdekTu.tcSOSkKsfhS7l6sQ24z22YFtu75nf4wFrku',''),('BianMagu','magunabianca07@gmail.com','$2a$10$j22fqGMiZ81H7hGeFMHXWOjqdWCRytK3lguuyIfHMff4FQUKS2K1O',''),('Blanca','Blanca20@gmail.com.ar','$2b$10$65RlqnJAF4qIOE8knolTcuox/80rl8olWIXIKfZJbIYW5weUyCkPK','Blanca20@'),('Camila','camila21@gmail.com','$2b$10$UB43FwyxmKs5My6vX138DeKyOu9LIg5mOTb8C92z/HhdjgUvFClku',''),('Carlos','doctor@getdoctorino.com','$2a$10$2CBskYS82.sdmRw993YMZOEc/ZxUXsojnuuKAiiBpng0PkouClgo.',''),('dramaria','maria.san@gmail.com','$2a$10$Jtys8k80.r2eALgdjQoD/e/EybtTJmCw5aCmcIkvSghb4JxhZgpr6',''),('drcarlos','carlos.med@gmail.com','$2a$10$fCMnahP7OX6ET79HBY1ECOpxhOVO5KosQaJksinyuZnTZbb2YDX9W',''),('drhernan','hernan_doc@gmail.com','$2a$10$1kQ175vm.xqh0DFIj4tsxeYUEZ9IpDz4eSITemzTVlWnOdNXFQB4u',''),('Franco ','Franco@gmail.com.ar','$2b$10$HnmWo/kObWrdzKvRdrVC6exhBq3tzZKjfDqbbciSlqNWMBeHwQ9oW',''),('Juan','juan@gmail.com','$2b$10$YkJayoZ.fUwaJTOSpJS8IOs/0IdAM9atbdCuMjbCCU.BGV/U4D2Im',''),('lucarod','lgr9529@gmail.com','$2b$10$A5xfQlrCuihp81ThE0MzO.UJ/41utLm9tojwHfw.mcNQCvUjOjzbK','Lukas.1995'),('Mario','magunabianca07@gmail.com','$2a$10$6OvQURR30abOm950vSIaZe2DdCr7qej72wyTQQJP3WxItlt927wZu',''),('Mati Navarro','mati@gmail.com','$2a$10$mPBhykjh3jWnTzNVUcnElu3dcWfgpmp0WXBk0hNmQXlugl9IYV7R2',''),('Nahir Savan','correo@gmail.com','$2a$10$ulXj/PokH8F2nEp6pqfqbe7yjB3mlrByOlZ6yEQWSvGnlG1ApmOI2',''),('Pablo','pablo@gmail.com','$2b$10$gCmBKX3nw4PoI2a3sMNSg.UXf57cugqZdwPw/mNnLCN1oAvjL9qHi',''),('Pablo V','pabloV@gmail.com','$2b$10$GspJoa.qXmjYqurChq1bFeEfvjc9b/DsC6zd6kJCcI0pltQ0D0VbC',''),('Roberto','Robert20@gmail.com','$2b$10$G5MGH1wmEGqOsRSChuPIQOOerKYbWi2xw.9x1WQPrUX31BS3v2xEm','');
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabla_paciente`
--

DROP TABLE IF EXISTS `tabla_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_paciente` (
  `buscar` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `consulta` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `historial` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `modificar` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`buscar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_paciente`
--

LOCK TABLES `tabla_paciente` WRITE;
/*!40000 ALTER TABLE `tabla_paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabla_paciente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01 19:07:02
