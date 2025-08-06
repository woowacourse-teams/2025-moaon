-- FullText Index
ALTER TABLE project
    ADD FULLTEXT INDEX idx_project_fulltext (title, summary, description) WITH PARSER ngram;

ALTER TABLE article
    ADD FULLTEXT INDEX idx_article_fulltext (title, summary, content) WITH PARSER ngram;
