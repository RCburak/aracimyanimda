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

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marka VARCHAR(255),
    model VARCHAR(255),
    yil INT,
    kiralik BOOLEAN,
    fiyat DECIMAL(10, 2)
);

-- Örnek veriler
INSERT INTO cars (marka, model, yil, kiralik, fiyat)
VALUES
    ('Ford', 'Fiesta', 2020, TRUE, 150.00),
    ('Audi', 'A4', 2022, TRUE, 250.00),
    ('Tesla', 'Model 3', 2023, FALSE, 500.00),
    ('BMW', 'X5', 2021, TRUE, 300.00);


DESCRIBE users;
