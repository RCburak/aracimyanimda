CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);


INSERT INTO users (name, email, password)
VALUES
    ('Ali Yılmaz', 'ali@example.com', 'password123'),
    ('Ayşe Kaya', 'ayse@example.com', 'ayse12345'),
    ('Burak Demir', 'burak@example.com', 'burak54321');

ALTER TABLE users
ADD COLUMN phone VARCHAR(20); -- Telefon numarası sütunu ekler

DESCRIBE users;

-- Araç verileri örnekleri
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Toyota', 'Corolla', 2022, 10000.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Honda', 'Civic', 2023, 12000.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Ford', 'Focus', 2021, 9500.00, false);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('BMW', '3 Series', 2020, 20000.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Audi', 'A4', 2019, 18000.00, false);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Volkswagen', 'Golf', 2022, 11000.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Mercedes', 'C-Class', 2021, 22000.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Hyundai', 'Elantra', 2022, 10500.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Nissan', 'Altima', 2020, 9000.00, false);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Chevrolet', 'Malibu', 2021, 9500.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Kia', 'Optima', 2023, 13000.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Mazda', 'Mazda3', 2021, 9700.00, false);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Tesla', 'Model 3', 2022, 35000.00, true);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Jeep', 'Cherokee', 2019, 15000.00, false);
INSERT INTO araclar (marka, model, yil, fiyat, kiralik) VALUES ('Subaru', 'Impreza', 2021, 8000.00, true);

DESCRIBE araclar;
SELECT * FROM araclar;
DELETE FROM araclar WHERE id = 1;
DELETE FROM araclar;
UPDATE `aracimyanimda`.`araclar` SET `id` = '3' WHERE (`id` = '16');
ALTER TABLE araclar ADD COLUMN kiralik TINYINT(1) DEFAULT 0;

