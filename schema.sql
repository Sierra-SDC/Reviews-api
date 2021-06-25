CREATE TABLE reviews (
    review_id INT PRIMARY KEY, 
    product_id INT, 
    rating INT, 
    date BIGINT, 
    summary VARCHAR (200), 
    body VARCHAR (500), 
    recommend BOOLEAN, 
    reported BOOLEAN, 
    reviewer_name TEXT, 
    reviewer_email TEXT,    
    response TEXT, 
    helpfulness INT
);

-- COPY reviews FROM '/Users/andrewhuang/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE photos (
    id INT PRIMARY KEY,
    review_id INT,
    url VARCHAR (300)
);

-- COPY photos FROM '/Users/andrewhuang/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE characteristics (
    id INT PRIMARY KEY,
    product_id INT,
    name TEXT
);

-- COPY characteristics FROM '/Users/andrewhuang/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE characteristic_reviews (
    id INT PRIMARY KEY,
    characteristic_id INT,
    review_id INT,
    value INT
);

-- COPY characteristic_reviews FROM '/Users/andrewhuang/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
