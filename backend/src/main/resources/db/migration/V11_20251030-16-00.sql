CREATE TABLE es_event_outbox (
    id BIGINT NOT NULL AUTO_INCREMENT,
    entity_id BIGINT NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    action VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payload TEXT,
    fail_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    processed_at TIMESTAMP(6) NULL,
    PRIMARY KEY (id)
);
