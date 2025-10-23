-- 운영 서버 배포 실패 시 롤백 대비
-- V9에서 추가된 crawl_count 컬럼(NOT NULL)에 DEFAULT 값을 설정하여 INSERT 오류를 해결합니다.
ALTER TABLE member
    ALTER COLUMN crawl_count SET DEFAULT 0;
