/* 
*  DB Script Tool
*  MySQL - 2020-06-24 13:22:08
*  type: Sales database
*/ 

/* 
*  products
*  products
*/ 
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(60) COLLATE utf8_general_ci,
    `status` TINYINT(1) DEFAULT 'false' NOT NULL,
    `details` TEXT(250) NOT NULL,
    `cost_price` NUMERIC(10,0) NOT NULL,
    `selling_price` NUMERIC(10,0) NOT NULL,
    `date_from` DATE NOT NULL,
    `date_to` DATE,
 PRIMARY KEY (`id`,`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1 ;



/* 
*  user
*  admin
*/ 
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `owners_name` VARCHAR(60) COLLATE utf8_general_ci NOT NULL,
    `owners_line` VARCHAR(20) COLLATE utf8_general_ci,
    `owners_picture` VARCHAR(10000) COLLATE utf8_general_ci,
    `password` VARCHAR(100) COLLATE utf8_general_ci,
    `company_name` VARCHAR(60) COLLATE utf8_general_ci NOT NULL,
    `company_line` VARCHAR(20) COLLATE utf8_general_ci NOT NULL,
    `company_picture` VARCHAR(1000) COLLATE utf8_general_ci,
    `created_date` DATE NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1 ;



/* 
*  category
*  contains categorized products.
*/ 
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER(200) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1 ;




ALTER TABLE `category` ADD  CONSTRAINT fk_categorized FOREIGN KEY (`category_id`) REFERENCES products(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;