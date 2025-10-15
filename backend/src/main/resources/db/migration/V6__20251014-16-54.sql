CREATE TABLE article_content(
    id BIGINT NOT NULL AUTO_INCREMENT,
    url TEXT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;
