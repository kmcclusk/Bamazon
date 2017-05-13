-- CREATE DATABASE Bamazon;

USE Bamazon;

/*
CREATE TABLE products (
	id INTEGER(4) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    stock_quantity INTEGER(4),
    
    PRIMARY KEY (id)
    );
    
*/

SELECT * FROM Bamazon.products;
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Pretty Girl Sparkle Gloss', 'Health and Beauty', 1.50, 30),
('Eye Love Color -- Eye Tint', 'Health and Beauty', 2.39, 10),
('Slick Stick Deodorant', 'Health and Beauty', 3.25, 25),
('Fizzypop Strawberry Soda', 'Food and Beverage', 1.99, 40),
('ChocoRocket Candy Bar', 'Food and Beverage', 1.29, 15),
('Chicken n\'Cheese Biscuit Snacks', 'Food and Beverage', 3.50, 10),
('Jelly Smellies Scented Markers', 'School Supplies', 4.82, 5),
('Peel n\'Post Sticky Notes', 'School Supplies', 1.10, 10),
('Doodle Dandy Sketch Pad', 'School Supplies', 2.26, 20);
