-- 쿼리 최적화 용 인덱스 추가

CREATE INDEX idx_category_id_project_id ON project_category (category_id, project_id);
CREATE INDEX idx_tech_stack_id_project_id ON project_tech_stack (tech_stack_id, project_id);

CREATE INDEX idx_article_sector_clicks_id ON article (sector, clicks DESC, id DESC);
CREATE INDEX idx_article_sector_created_at_id ON article (sector, created_at DESC, id DESC);
CREATE INDEX idx_topics_article_id ON article_topics (topics, article_id);
