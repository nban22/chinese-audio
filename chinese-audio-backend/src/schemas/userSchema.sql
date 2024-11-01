CREATE TABLE participant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    favorite_things TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO participant (email, password, favorite_things, role) VALUES
('john.doe@example.com', 'hashed_password_1', 'Reading, Gaming, Hiking', 'user'),
('jane.smith@example.com', 'hashed_password_2', 'Cooking, Traveling, Yoga', 'user'),
('admin@example.com', 'hashed_password_3', 'Managing, Organizing', 'admin'),
('mike.jones@example.com', 'hashed_password_4', 'Photography, Music', 'user'),
('sarah.brown@example.com', 'hashed_password_5', 'Fitness, Writing', 'user'),
('alice.johnson@example.com', 'hashed_password_6', 'Painting, Dancing', 'user');