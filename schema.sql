-- products DATA
-- COPY products FROM '/Users/andrewhuang/Downloads/product.csv' DELIMITER ',' CSV HEADER;

--reviews DATA
-- COPY reviews FROM '/Users/andrewhuang/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;

--photos DATA
-- COPY photos FROM '/Users/andrewhuang/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;

-- characteristics DATA
-- COPY characteristics FROM '/Users/andrewhuang/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;

-- characteristic_reviews DATA
-- COPY characteristic_reviews FROM '/Users/andrewhuang/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

-- SELECT setval('products_product_id_seq', (SELECT count(*) FROM products), true);
-- SELECT setval('reviews_review_id_seq', (SELECT count(*) FROM reviews), true);
-- SELECT setval('photos_id_seq', (SELECT count(*) FROM photos), true);
-- SELECT setval('characteristics_id_seq', (SELECT count(*) FROM characteristics), true);
-- SELECT setval('characteristic_reviews_id_seq', (SELECT count(*) FROM characteristic_reviews), true);

-- SELECT setval('serial', max(product_id)) FROM products;
-- SELECT setval('serial', max(review_id)) FROM reviews;
-- SELECT setval('serial', max(id)) FROM photos;
-- SELECT setval('serial', max(id)) FROM characteristics;
-- SELECT setval('serial', max(id)) FROM characteristic_reviews;