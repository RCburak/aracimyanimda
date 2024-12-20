CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

DESCRIBE users;
SELECT * FROM users;
ALTER TABLE users
ADD COLUMN phone VARCHAR(20); -- Telefon numarası sütunu ekler


CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marka VARCHAR(255),
    model VARCHAR(255),
    yil INT,
    kiralik BOOLEAN,
    fiyat DECIMAL(10, 2)
);



DESCRIBE araclar;
SELECT * FROM araclar;
DELETE FROM araclar WHERE id = 1;
DELETE FROM araclar;
UPDATE `aracimyanimda`.`araclar` SET `id` = '3' WHERE (`id` = '16');
ALTER TABLE araclar ADD COLUMN kiralik TINYINT(1) DEFAULT 0;

