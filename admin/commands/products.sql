CREATE TABLE IF NOT EXISTS products(
	id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	product_id VARCHAR(100) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	category_name VARCHAR(100) NOT NULL,
	status_bool VARCHAR(100) NOT NULL,
	details VARCHAR(200) NOT NULL,
	cost_price VARCHAR(100) NOT NULL,
	selling_price VARCHAR(100) NOT NULL,
	date_from TIMESTAMP,
	date_to DATE
)


INSERT INTO products(product_id,product_name, category_name, status_bool,shortDesc,longDesc, cost_price,selling_price,image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,);