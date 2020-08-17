/* 
*  DB Script Tool
*  MySQL - 2020-05-31 09:57:07
*  Demo: Sales database
* 
* SQL COMMANDS FOR dbSalesDemo DATABASE
*/ 



/* -----------------------------------
*  Select command - dbSalesDemo.products
*/ 
SELECT id, category_id, category_name, status, details, cost_price, selling_price, date_from, date_to 
        FROM products 
        WHERE id=? 
        ORDER BY id ASC;


/* 
*  Insert command - dbSalesDemo.products
*/ 
INSERT INTO products(id, category_id, category_name, status, details, cost_price, selling_price, date_from, date_to) 
        VALUES(NULL, NULL, '?', true, '?', 0.0, 0.0, '2020-05-31', '2020-05-31');


/* 
*  Update command - dbSalesDemo.products
*/ 
UPDATE products 
        SET category_id=NULL, category_name='?', status=true, details='?', cost_price=0.0, selling_price=0.0, date_from='2020-05-31', date_to='2020-05-31'
        WHERE id=?;


/*
*  Delete command - dbSalesDemo.products
*/ 
DELETE FROM products 
        WHERE id=?;


/* -----------------------------------
*  Select command - dbSalesDemo.user
*/ 
SELECT id, owners_name, owners_line, owners_picture, password, company_name, company_line, company_picture, created_date 
        FROM user 
        WHERE id=? 
        ORDER BY id ASC;


/* 
*  Insert command - dbSalesDemo.user
*/ 
INSERT INTO user(id, owners_name, owners_line, owners_picture, password, company_name, company_line, company_picture, created_date) 
        VALUES(NULL, '?', '?', NULL, '?', '?', '?', NULL, '2020-05-31');


/* 
*  Update command - dbSalesDemo.user
*/ 
UPDATE user 
        SET owners_name='?', owners_line='?', owners_picture=NULL, password='?', company_name='?', company_line='?', company_picture=NULL, created_date='2020-05-31'
        WHERE id=?;


/*
*  Delete command - dbSalesDemo.user
*/ 
DELETE FROM user 
        WHERE id=?;