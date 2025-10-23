ALTER TABLE member
    ADD COLUMN social_id VARCHAR(255),
    ADD COLUMN email VARCHAR(255);

UPDATE member
SET social_id = '1234',
    email = 'moaon0704@gmail.com'
WHERE social_id IS NULL OR email IS NULL;

ALTER TABLE member
    MODIFY social_id VARCHAR(255) NOT NULL UNIQUE,
    MODIFY email VARCHAR(255) NOT NULL;
