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
