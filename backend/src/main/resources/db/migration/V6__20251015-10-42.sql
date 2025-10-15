-- 기존 member 테이블에 새로운 컬럼 추가
ALTER TABLE member
    ADD COLUMN social_id VARCHAR(255) NOT NULL UNIQUE,
    ADD COLUMN email VARCHAR(255) NOT NULL;
