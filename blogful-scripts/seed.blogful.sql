BEGIN;

INSERT INTO blogful_articles (title, date_published, content)
VALUES
    ('Human values', 'this is my first content',              false,  now() - '21 days'::INTERVAL),
    (' Problems',  'This is the probleme section',                 true,   now() - '21 days'::INTERVAL),
    ('Solution','This is the solution to the problen',           false,  now() - '21 days'::INTERVAL),
    
;

COMMIT;