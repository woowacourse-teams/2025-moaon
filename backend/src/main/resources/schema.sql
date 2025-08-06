DROP TABLE IF EXISTS article_tech_stacks;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS article_category;
DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS project_loved_members;
DROP TABLE IF EXISTS project_tech_stacks;
DROP TABLE IF EXISTS project_urls;
DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS tech_stack;

CREATE TABLE article
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    clicks      INT          NOT NULL,
    category_id BIGINT,
    created_at  TIMESTAMP(6) NOT NULL,
    project_id  BIGINT,
    updated_at  TIMESTAMP(6),
    article_url VARCHAR(255) NOT NULL,
    content     VARCHAR(255) NOT NULL,
    summary     VARCHAR(255) NOT NULL,
    title       VARCHAR(255) NOT NULL
);

CREATE TABLE article_tech_stacks
(
    article_id     BIGINT NOT NULL,
    tech_stacks_id BIGINT NOT NULL
);

CREATE TABLE article_category
(
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE member
(
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE project
(
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    views          INT          NOT NULL,
    author_id      BIGINT,
    created_at     TIMESTAMP(6) NOT NULL,
    updated_at     TIMESTAMP(6),
    description    VARCHAR(255) NOT NULL,
    github_url     VARCHAR(255),
    production_url VARCHAR(255),
    summary        VARCHAR(255) NOT NULL,
    title          VARCHAR(255) NOT NULL
);

CREATE TABLE project_categories
(
    categories_id BIGINT NOT NULL,
    project_id    BIGINT NOT NULL
);

CREATE TABLE project_loved_members
(
    loved_members_id BIGINT NOT NULL,
    project_id       BIGINT NOT NULL
);

CREATE TABLE project_tech_stacks
(
    project_id     BIGINT NOT NULL,
    tech_stacks_id BIGINT NOT NULL
);

CREATE TABLE project_urls
(
    project_id BIGINT NOT NULL,
    urls       VARCHAR(255)
);

CREATE TABLE project_category
(
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tech_stack
(
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- 일반 인덱스 (정렬 방향 생략)
CREATE INDEX idx_article_created_at_id ON article (created_at, id);
CREATE INDEX idx_article_clicks_id ON article (clicks, id);

-- FullText Index (ngram parser 사용)
ALTER TABLE project
    ADD FULLTEXT INDEX idx_project_fulltext (title, summary, description) WITH PARSER ngram;

ALTER TABLE article
    ADD FULLTEXT INDEX idx_article_fulltext (title, summary, content) WITH PARSER ngram;

-- Foreign Keys
ALTER TABLE article
    ADD CONSTRAINT FK_article_category
        FOREIGN KEY (category_id) REFERENCES article_category (id);

ALTER TABLE article
    ADD CONSTRAINT FK_article_project
        FOREIGN KEY (project_id) REFERENCES project (id);

ALTER TABLE article_tech_stacks
    ADD CONSTRAINT FK_article_tech_stack_stack
        FOREIGN KEY (tech_stacks_id) REFERENCES tech_stack (id),
    ADD CONSTRAINT FK_article_tech_stack_article
    FOREIGN KEY (article_id) REFERENCES article(id);

ALTER TABLE project
    ADD CONSTRAINT FK_project_author
        FOREIGN KEY (author_id) REFERENCES member (id);

ALTER TABLE project_categories
    ADD CONSTRAINT FK_project_category
        FOREIGN KEY (categories_id) REFERENCES project_category (id),
    ADD CONSTRAINT FK_project_category_project
    FOREIGN KEY (project_id) REFERENCES project(id);

ALTER TABLE project_loved_members
    ADD CONSTRAINT FK_project_loved_member
        FOREIGN KEY (loved_members_id) REFERENCES member (id),
    ADD CONSTRAINT FK_project_loved_member_project
    FOREIGN KEY (project_id) REFERENCES project(id);

ALTER TABLE project_tech_stacks
    ADD CONSTRAINT FK_project_tech_stack_stack
        FOREIGN KEY (tech_stacks_id) REFERENCES tech_stack (id),
    ADD CONSTRAINT FK_project_tech_stack_project
    FOREIGN KEY (project_id) REFERENCES project(id);

ALTER TABLE project_urls
    ADD CONSTRAINT FK_project_urls_project
        FOREIGN KEY (project_id) REFERENCES project (id);
