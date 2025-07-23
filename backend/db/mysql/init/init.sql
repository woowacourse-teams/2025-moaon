-- MySQL dump 10.13  Distrib 9.2.0, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: moaon
-- ------------------------------------------------------
-- Server version	8.4.5

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK46ccwnsi9409t36lurvtyljak` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (11,'ecommerce'),(1,'education'),(4,'entertainment'),(12,'etc'),(9,'finance'),(3,'game'),(7,'health'),(2,'it'),(8,'life'),(6,'social'),(10,'sports'),(5,'travel');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'노랑'),(2,'다로'),(3,'말론'),(4,'포포');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8j5y8ipk73yx2joy9yr653c9t` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES (1,'2025-07-23 14:42:51.000000','woowacourse'),(2,'2025-07-23 14:42:54.000000','boostcamp'),(3,'2025-07-23 14:42:55.000000','ssafy'),(4,'2025-07-23 14:42:57.000000','swm');
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform`
--

DROP TABLE IF EXISTS `platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKhp36t3hx9su23msu2p5qvukyh` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform`
--

LOCK TABLES `platform` WRITE;
/*!40000 ALTER TABLE `platform` DISABLE KEYS */;
INSERT INTO `platform` VALUES (4,'android'),(2,'desktop'),(3,'ios'),(1,'web');
/*!40000 ALTER TABLE `platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `views` int NOT NULL,
  `author_id` bigint DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `organization_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `github_url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `production_url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `summary` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7j5fq09s3tav2p5owwydrfw41` (`author_id`),
  KEY `FK56l08pkdkr9onlugrsj27t6a3` (`organization_id`),
  CONSTRAINT `FK56l08pkdkr9onlugrsj27t6a3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`),
  CONSTRAINT `FK7j5fq09s3tav2p5owwydrfw41` FOREIGN KEY (`author_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (10,4,'2025-07-23 14:45:52.000000',1,4,'2025-07-23 14:46:30.000000','GitHub, Notion, Velog 등 다양한 출처의 링크들을 카드 형태로 시각화하여 보여줍니다.','https://github.com/woowacourse-teams/2025-moaon',NULL,'여러 플랫폼에 흩어진 포트폴리오를 한 곳에 정리할 수 있는 서비스입니다.','모아온'),(3263,3,'2025-05-21 05:53:42.000000',2,1,'2025-05-21 05:53:42.000000','팀 협업 효율을 높이기 위한 관리 도구','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','팀 협업 효율을 높이기 위한 관리 도구','프로젝트 관리 시스템 개선'),(4659,2,'2025-01-26 05:53:42.000000',3,2,'2025-01-26 05:53:42.000000','사용자 취향에 맞는 맞춤형 추천 제공','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','사용자 취향에 맞는 맞춤형 추천 제공','AI 기반 추천 서비스 개발'),(1312,1,'2024-10-27 05:53:42.000000',4,2,'2024-10-27 05:53:42.000000','데이터 기반 의사결정을 위한 시각화 제공','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','데이터 기반 의사결정을 위한 시각화 제공','데이터 시각화 대시보드 구축'),(4376,1,'2024-07-29 05:53:42.000000',5,1,'2024-07-29 05:53:42.000000','안정적인 실시간 소통 지원','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','안정적인 실시간 소통 지원','실시간 채팅 애플리케이션'),(2033,3,'2024-10-24 05:53:42.000000',6,3,'2024-10-24 05:53:42.000000','클라우드 리소스 최적화를 통한 비용 절감','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','클라우드 리소스 최적화를 통한 비용 절감','클라우드 비용 최적화 솔루션'),(4308,3,'2025-05-17 05:53:42.000000',7,3,'2025-05-17 05:53:42.000000','보안 위협 대응과 안전한 사용자 인증','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','보안 위협 대응과 안전한 사용자 인증','사용자 인증 및 보안 강화'),(1235,1,'2024-08-02 05:53:42.000000',8,2,'2024-08-02 05:53:42.000000','서버 성능 추적과 병목 구간 파악','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','서버 성능 추적과 병목 구간 파악','백엔드 성능 모니터링 도구'),(574,4,'2024-12-23 05:53:42.000000',9,1,'2024-12-23 05:53:42.000000','사용자 친화적 인터페이스 제공','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','사용자 친화적 인터페이스 제공','프론트엔드 UI/UX 리디자인'),(1048,3,'2025-05-02 05:53:42.000000',10,1,'2025-05-02 05:53:42.000000','오픈소스 프로젝트 자동화 기여','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','오픈소스 프로젝트 자동화 기여','오픈소스 기여 자동화 툴'),(4001,4,'2025-04-03 05:53:42.000000',11,1,'2025-04-03 05:53:42.000000','물류 이동 상황 실시간 추적','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','물류 이동 상황 실시간 추적','스마트 물류 추적 시스템'),(422,1,'2025-02-06 05:53:42.000000',12,4,'2025-02-06 05:53:42.000000','주문 및 결제 관리 효율화','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','주문 및 결제 관리 효율화','이커머스 주문 관리 플랫폼'),(2449,4,'2024-10-23 05:53:42.000000',13,4,'2024-10-23 05:53:42.000000','사용자 관계망 분석 및 인사이트 제공','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','사용자 관계망 분석 및 인사이트 제공','소셜 네트워크 분석 서비스'),(1181,4,'2025-05-21 05:53:42.000000',14,3,'2025-05-21 05:53:42.000000','로그 데이터 기반 시스템 이상 탐지','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','로그 데이터 기반 시스템 이상 탐지','실시간 로그 수집 및 분석'),(1934,1,'2024-12-20 05:53:42.000000',15,3,'2024-12-20 05:53:42.000000','API 문서화 자동 생성 및 배포','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','API 문서화 자동 생성 및 배포','개발자용 API 문서 자동화'),(2110,4,'2024-10-26 05:53:42.000000',16,3,'2024-10-26 05:53:42.000000','머신러닝 모델 운영 및 관리','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','머신러닝 모델 운영 및 관리','머신러닝 모델 서빙 플랫폼'),(2563,4,'2025-04-26 05:53:42.000000',17,3,'2025-04-26 05:53:42.000000','초보 개발자를 위한 코딩 학습 지원','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','초보 개발자를 위한 코딩 학습 지원','교육용 코딩 학습 서비스'),(371,3,'2024-10-07 05:53:42.000000',18,1,'2024-10-07 05:53:42.000000','원활한 사내 협업 환경 제공','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','원활한 사내 협업 환경 제공','사내 협업 도구 고도화'),(4152,3,'2025-06-03 05:53:42.000000',19,1,'2025-06-03 05:53:42.000000','검색 속도와 정확도 향상','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','검색 속도와 정확도 향상','검색 성능 개선 프로젝트'),(4257,1,'2024-08-28 05:53:42.000000',20,3,'2024-08-28 05:53:42.000000','자연어 처리 기반 상담 지원','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','자연어 처리 기반 상담 지원','챗봇 고객센터 구축'),(3810,1,'2025-04-21 05:53:42.000000',21,1,'2025-04-21 05:53:42.000000','데이터 손실 방지를 위한 백업 관리','https://github.com/woowacourse-teams/2025-moaon','https://www.naver.com/','데이터 손실 방지를 위한 백업 관리','데이터 백업 및 복구 시스템');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_categories`
--

DROP TABLE IF EXISTS `project_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_categories` (
  `categories_id` bigint NOT NULL,
  `project_id` bigint NOT NULL,
  KEY `FKjyrj6b9f49h6tui7sa4mm3fq9` (`categories_id`),
  KEY `FK5qktsga4s9nnshjypb2lm28br` (`project_id`),
  CONSTRAINT `FK5qktsga4s9nnshjypb2lm28br` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FKjyrj6b9f49h6tui7sa4mm3fq9` FOREIGN KEY (`categories_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_categories`
--

LOCK TABLES `project_categories` WRITE;
/*!40000 ALTER TABLE `project_categories` DISABLE KEYS */;
INSERT INTO `project_categories` VALUES (1,1),(2,1),(3,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(1,13),(2,14),(3,15),(3,16),(4,17),(5,18),(6,19),(7,20),(8,21),(9,18),(10,19),(11,20),(12,21);
/*!40000 ALTER TABLE `project_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_loved_members`
--

DROP TABLE IF EXISTS `project_loved_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_loved_members` (
  `loved_members_id` bigint NOT NULL,
  `project_id` bigint NOT NULL,
  KEY `FK5jw8ir7dkuhkft4cimtoxpq0o` (`loved_members_id`),
  KEY `FK3sl3tgck5a92omdlbf4w25v7h` (`project_id`),
  CONSTRAINT `FK3sl3tgck5a92omdlbf4w25v7h` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FK5jw8ir7dkuhkft4cimtoxpq0o` FOREIGN KEY (`loved_members_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_loved_members`
--

LOCK TABLES `project_loved_members` WRITE;
/*!40000 ALTER TABLE `project_loved_members` DISABLE KEYS */;
INSERT INTO `project_loved_members` VALUES (1,1),(2,1),(3,2),(3,3),(4,4),(1,5),(2,6),(3,7),(3,8),(4,9),(1,10),(2,11),(3,12),(3,13),(4,14),(1,15),(2,16),(3,17),(1,18),(2,19),(3,20),(3,21),(4,18),(1,19),(2,20),(3,21),(3,1),(4,1),(3,1),(4,1),(3,1),(4,1),(3,1),(4,1),(4,2),(4,2),(4,2),(4,2),(4,3),(4,3);
/*!40000 ALTER TABLE `project_loved_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_platforms`
--

DROP TABLE IF EXISTS `project_platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_platforms` (
  `platforms_id` bigint NOT NULL,
  `project_id` bigint NOT NULL,
  KEY `FKhm9xxf2dipq67s9v79vk9a2p4` (`platforms_id`),
  KEY `FKauo9duiw589exvriptboh6a60` (`project_id`),
  CONSTRAINT `FKauo9duiw589exvriptboh6a60` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FKhm9xxf2dipq67s9v79vk9a2p4` FOREIGN KEY (`platforms_id`) REFERENCES `platform` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_platforms`
--

LOCK TABLES `project_platforms` WRITE;
/*!40000 ALTER TABLE `project_platforms` DISABLE KEYS */;
INSERT INTO `project_platforms` VALUES (1,1),(2,1),(3,2),(3,3),(4,4),(1,5),(2,6),(3,7),(3,8),(4,9),(1,10),(2,11),(3,12),(3,13),(4,14),(1,15),(2,16),(3,17),(1,18),(2,19),(3,20),(3,21);
/*!40000 ALTER TABLE `project_platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_tech_stacks`
--

DROP TABLE IF EXISTS `project_tech_stacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_tech_stacks` (
  `project_id` bigint NOT NULL,
  `tech_stacks_id` bigint NOT NULL,
  KEY `FK6xicevkbcpjhh2v919nafkj8k` (`tech_stacks_id`),
  KEY `FKd6ch30jbolba74uxwc3evs7so` (`project_id`),
  CONSTRAINT `FK6xicevkbcpjhh2v919nafkj8k` FOREIGN KEY (`tech_stacks_id`) REFERENCES `tech_stack` (`id`),
  CONSTRAINT `FKd6ch30jbolba74uxwc3evs7so` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_tech_stacks`
--

LOCK TABLES `project_tech_stacks` WRITE;
/*!40000 ALTER TABLE `project_tech_stacks` DISABLE KEYS */;
INSERT INTO `project_tech_stacks` VALUES (1,5),(2,29),(3,39),(4,40),(5,13),(6,23),(7,35),(8,12),(9,21),(10,24),(11,43),(12,37),(13,9),(14,16),(15,7),(16,34),(17,41),(18,36),(19,30),(20,32),(21,22),(1,2),(2,20),(3,4),(4,31),(5,38),(6,1),(7,19),(8,14),(9,33),(10,18),(11,27),(12,25),(13,26),(14,11),(15,28),(16,6),(17,42),(18,10),(19,17),(20,8),(21,3),(1,15);
/*!40000 ALTER TABLE `project_tech_stacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_urls`
--

DROP TABLE IF EXISTS `project_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_urls` (
  `project_id` bigint NOT NULL,
  `urls` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  KEY `FK213vu7ufs0q5w5mn2yj0b5ekn` (`project_id`),
  CONSTRAINT `FK213vu7ufs0q5w5mn2yj0b5ekn` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_urls`
--

LOCK TABLES `project_urls` WRITE;
INSERT INTO `project_urls` VALUES (1,'https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Ftechcourse-storage.s3.ap-northeast-2.amazonaws.com%2Fwooteco.webp&blockId=202af4c7-6ac9-4e3a-bb4e-6a94cca88d48'),(2,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(3,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(4,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(5,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(6,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(7,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(8,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(9,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(10,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(11,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(12,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(13,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(14,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(15,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(16,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(17,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(18,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(19,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(20,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(21,'https://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg'),(1,'https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg'),(2,'https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg'),(3,'https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg'),(4,'https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg'),(5,'https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg');
/*!40000 ALTER TABLE `project_urls` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tech_stack`
--

DROP TABLE IF EXISTS `tech_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tech_stack` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKes1l6cgxtxwaim0a9t26r544c` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tech_stack`
--

LOCK TABLES `tech_stack` WRITE;
/*!40000 ALTER TABLE `tech_stack` DISABLE KEYS */;
INSERT INTO `tech_stack` VALUES (5,'angular'),(29,'aws'),(39,'c'),(40,'cpp'),(13,'cssModule'),(23,'django'),(35,'docker'),(12,'emotion'),(21,'express'),(24,'fastapi'),(43,'flutter'),(37,'java'),(9,'javascript'),(16,'jotai'),(7,'jquery'),(34,'kafka'),(41,'kotlin'),(36,'kubernetes'),(30,'mongodb'),(32,'mysql'),(22,'nestjs'),(2,'nextjs'),(20,'nodejs'),(4,'nuxtjs'),(31,'postgresql'),(38,'python'),(1,'react'),(19,'reactNative'),(14,'recoil'),(33,'redis'),(18,'redux'),(27,'rubyonrails'),(25,'spring'),(26,'springboot'),(11,'styledComponents'),(28,'supabase'),(6,'svelte'),(42,'swift'),(10,'tailwind '),(17,'tanstackQuery'),(8,'typescript'),(3,'vuejs'),(15,'zustand');
/*!40000 ALTER TABLE `tech_stack` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-23 15:08:05
