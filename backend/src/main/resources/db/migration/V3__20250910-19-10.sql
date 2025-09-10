-- ### 1단계: article 테이블에 새로운 sector 컬럼 추가 (NULL 허용) ###
ALTER TABLE `article`
    ADD COLUMN `sector` ENUM ('ANDROID','BE','FE','INFRA','IOS','NON_TECH') NULL DEFAULT NULL;

-- ### 2단계: 기존 article_category 데이터를 새로운 sector 컬럼으로 수동 매핑하여 업데이트 ###
-- CASE 문에 해당하지 않는 name이 있으면 sector가 NULL이 될 수 있습니다.
UPDATE article a
    JOIN article_category ac ON a.category_id = ac.id
SET a.sector = CASE ac.name
                   WHEN 'be' THEN 'BE'
                   WHEN 'fe' THEN 'FE'
                   WHEN 'ios' THEN 'IOS'
                   WHEN 'android' THEN 'ANDROID'
                   WHEN 'ss' THEN 'NON_TECH'
                   WHEN 'etc' THEN 'NON_TECH'
    END;

-- ### 3단계: sector 컬럼에 NOT NULL 제약조건 추가 ###
-- 2단계 실행 후 sector 컬럼에 NULL 값이 없는 것이 확실할 때 실행해야 합니다.
ALTER TABLE `article`
    MODIFY COLUMN `sector` ENUM ('ANDROID','BE','FE','INFRA','IOS','NON_TECH') NOT NULL;

-- ### 4단계: 더 이상 사용하지 않는 외래 키, 컬럼, 인덱스, 테이블 삭제 ###
-- 4-1. article 테이블의 category_id 관련 요소 삭제
ALTER TABLE `article`
    DROP FOREIGN KEY `FK_article_category`;
ALTER TABLE `article`
    DROP COLUMN `category_id`;

-- 4-2. article_category 테이블 삭제
DROP TABLE `article_category`;

-- ### 5단계: 새로운 article_topics 테이블 생성 ###
CREATE TABLE `article_topics`
(
    `article_id` BIGINT NOT NULL,
    `topics`     ENUM ('API_DESIGN','ARCHITECTURE_DESIGN','BUNDLING','CI_CD','CODE_QUALITY','DATABASE','DEPLOYMENT_AND_OPERATION','DESIGN','ETC','MONITORING_AND_LOGGING','NETWORK','PERFORMANCE_OPTIMIZATION','PLANNING','RETROSPECTIVE','SECURITY','STATE_MANAGEMENT','TEAM_CULTURE','TECHNOLOGY_ADOPTION','TESTING','TROUBLESHOOTING','UI_UX_IMPROVEMENT')
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- ### 6단계: article_topics 테이블에 외래 키 추가 ###
ALTER TABLE `article_topics`
    ADD CONSTRAINT `FK_article_topics_article`
        FOREIGN KEY (`article_id`) REFERENCES `article` (`id`);

-- ### 7단계: 모든 기존 article에 대해 'ETC' 토픽 추가 ###
INSERT INTO `article_topics` (`article_id`, `topics`)
SELECT `id`, 'ETC'
FROM `article`;
