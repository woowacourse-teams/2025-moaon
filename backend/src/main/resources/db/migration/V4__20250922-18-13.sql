-- ### 1단계: 이름이 변경될 테이블들의 기존 외래 키 제약 조건 삭제 ###
-- 이 작업을 먼저 수행해야 테이블 및 컬럼 이름 변경 시 오류가 발생하지 않습니다.
ALTER TABLE `project_categories`
    DROP FOREIGN KEY `FK_pc_project`;
ALTER TABLE `project_categories`
    DROP FOREIGN KEY `FK_pc_project_category`;

ALTER TABLE `project_tech_stacks`
    DROP FOREIGN KEY `FK_pts_project`;
ALTER TABLE `project_tech_stacks`
    DROP FOREIGN KEY `FK_pts_tech_stack`;

ALTER TABLE `article_tech_stacks`
    DROP FOREIGN KEY `FK_ats_article`;
ALTER TABLE `article_tech_stacks`
    DROP FOREIGN KEY `FK_ats_tech_stack`;

-- ### 2단계: 카테고리 테이블 이름 변경 ###
-- 'project_category'는 카테고리 자체를 의미하므로 더 명확한 'category'로 변경합니다.
ALTER TABLE `project_category` RENAME TO `category`;
ALTER TABLE `category`
    DROP INDEX `UK_project_category_name`;
ALTER TABLE `category`
    ADD CONSTRAINT `UK_category_name` UNIQUE (`name`);


-- ### 3단계: project_categories 테이블을 새로운 project_category 테이블로 전환 ###
-- 기존 테이블을 임시로 이름을 바꾼 뒤, 새 구조의 테이블을 만들고 데이터를 이전합니다.
ALTER TABLE `project_categories` RENAME TO `project_categories_old`;

-- 새 구조의 project_category 테이블 생성 (ID PK 포함)
CREATE TABLE `project_category`
(
    `id`          BIGINT NOT NULL AUTO_INCREMENT,
    `project_id`  BIGINT,
    `category_id` BIGINT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- 기존 데이터 마이그레이션
INSERT INTO `project_category` (project_id, category_id)
SELECT project_id, categories_id
FROM `project_categories_old`;

-- 임시 테이블 삭제
DROP TABLE `project_categories_old`;


-- ### 4단계: project_tech_stacks 테이블을 project_tech_stack으로 전환 ###
-- 테이블 이름을 단수로 변경하고, ID 기반의 PK를 추가하며, 컬럼 이름을 맞춥니다.
ALTER TABLE `project_tech_stacks` RENAME TO `project_tech_stack`;
ALTER TABLE `project_tech_stack`
    ADD COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE `project_tech_stack`
    CHANGE COLUMN `tech_stacks_id` `tech_stack_id` BIGINT NOT NULL;


-- ### 5단계: article_tech_stacks 테이블을 article_tech_stack으로 전환 ###
-- 테이블 이름을 단수로 변경하고, ID 기반의 PK를 추가하며, 컬럼 이름을 맞춥니다.
ALTER TABLE `article_tech_stacks` RENAME TO `article_tech_stack`;
ALTER TABLE `article_tech_stack`
    ADD COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE `article_tech_stack`
    CHANGE COLUMN `tech_stacks_id` `tech_stack_id` BIGINT NOT NULL;


-- ### 6단계: 새로운 외래 키 제약 조건 추가 ###
-- 변경된 테이블과 컬럼 구조에 맞춰 모든 외래 키를 명시적인 이름으로 다시 설정합니다.
-- Project <-> Category (N:M)
ALTER TABLE `project_category`
    ADD CONSTRAINT `FK_project_category_project`
        FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);
ALTER TABLE `project_category`
    ADD CONSTRAINT `FK_project_category_category`
        FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

-- Project <-> TechStack (N:M)
ALTER TABLE `project_tech_stack`
    ADD CONSTRAINT `FK_project_tech_stack_project`
        FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);
ALTER TABLE `project_tech_stack`
    ADD CONSTRAINT `FK_project_tech_stack_tech_stack`
        FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stack` (`id`);

-- Article <-> TechStack (N:M)
ALTER TABLE `article_tech_stack`
    ADD CONSTRAINT `FK_article_tech_stack_article`
        FOREIGN KEY (`article_id`) REFERENCES `article` (`id`);
ALTER TABLE `article_tech_stack`
    ADD CONSTRAINT `FK_article_tech_stack_tech_stack`
        FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stack` (`id`);
