CREATE TABLE member (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE article_category (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UK_article_category_name UNIQUE (name)
) ENGINE=InnoDB;

CREATE TABLE project_category (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UK_project_category_name UNIQUE (name)
) ENGINE=InnoDB;

CREATE TABLE tech_stack (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UK_tech_stack_name UNIQUE (name)
) ENGINE=InnoDB;

CREATE TABLE project (
    id BIGINT NOT NULL AUTO_INCREMENT,
    author_id BIGINT,
    title VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    github_url VARCHAR(500),
    production_url VARCHAR(500),
    views INTEGER NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6),
    PRIMARY KEY (id),
    INDEX idx_project_created_at_id (created_at DESC, id DESC),
    INDEX idx_project_views_id (views DESC, id DESC),
    CONSTRAINT FK_project_member
        FOREIGN KEY (author_id) REFERENCES member (id),
    FULLTEXT INDEX `idx_project_fulltext` (`title`, `summary`, `description`) WITH PARSER NGRAM
) ENGINE=InnoDB;

CREATE TABLE article (
    id BIGINT NOT NULL AUTO_INCREMENT,
    category_id BIGINT,
    project_id BIGINT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    summary VARCHAR(255) NOT NULL,
    article_url VARCHAR(500) NOT NULL,
    clicks INTEGER NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6),
    PRIMARY KEY (id),
    INDEX idx_article_created_at_id (created_at DESC, id DESC),
    INDEX idx_article_clicks_id (clicks DESC, id DESC),
    CONSTRAINT FK_article_category
        FOREIGN KEY (category_id) REFERENCES article_category (id),
    CONSTRAINT FK_article_project
        FOREIGN KEY (project_id) REFERENCES project (id),
    FULLTEXT INDEX `idx_article_fulltext` (`title`, `summary`, `content`) WITH PARSER NGRAM
) ENGINE=InnoDB;

CREATE TABLE article_tech_stacks (
    article_id BIGINT NOT NULL,
    tech_stacks_id BIGINT NOT NULL,
    CONSTRAINT FK_ats_article
        FOREIGN KEY (article_id) REFERENCES article (id),
    CONSTRAINT FK_ats_tech_stack
        FOREIGN KEY (tech_stacks_id) REFERENCES tech_stack (id)
) ENGINE=InnoDB;

CREATE TABLE project_categories (
    project_id BIGINT NOT NULL,
    categories_id BIGINT NOT NULL,
    CONSTRAINT FK_pc_project
        FOREIGN KEY (project_id) REFERENCES project (id),
    CONSTRAINT FK_pc_project_category
        FOREIGN KEY (categories_id) REFERENCES project_category (id)
) ENGINE=InnoDB;

CREATE TABLE project_loved_members (
   project_id BIGINT NOT NULL,
   loved_members_id BIGINT NOT NULL,
   CONSTRAINT FK_plm_project
       FOREIGN KEY (project_id) REFERENCES project (id),
   CONSTRAINT FK_plm_member
       FOREIGN KEY (loved_members_id) REFERENCES member (id)
) ENGINE=InnoDB;

CREATE TABLE project_tech_stacks (
    project_id BIGINT NOT NULL,
    tech_stacks_id BIGINT NOT NULL,
    CONSTRAINT FK_pts_project
        FOREIGN KEY (project_id) REFERENCES project (id),
    CONSTRAINT FK_pts_tech_stack
        FOREIGN KEY (tech_stacks_id) REFERENCES tech_stack (id)
) ENGINE=InnoDB;

CREATE TABLE project_urls (
    project_id BIGINT NOT NULL,
    urls VARCHAR(500),
    CONSTRAINT FK_project_urls_project
        FOREIGN KEY (project_id) REFERENCES project (id)
) ENGINE=InnoDB;
