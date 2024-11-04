-- Crear tablas para el sistema de administración de librería

-- Tabla de Usuarios
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Categorías de Libros
CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

-- Tabla de Libros
CREATE TABLE Books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    published_date DATE,
    category_id INT REFERENCES Categories(id) ON DELETE SET NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Préstamos
CREATE TABLE Loans (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    book_id INT REFERENCES Books(id) ON DELETE CASCADE,
    loan_date DATE DEFAULT NOW(),
    due_date DATE,
    return_date DATE,
    status VARCHAR(10) CHECK (status IN ('active', 'returned', 'overdue')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Reservas
CREATE TABLE Reservations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    book_id INT REFERENCES Books(id) ON DELETE CASCADE,
    reservation_date DATE DEFAULT NOW(),
    status VARCHAR(10) CHECK (status IN ('pending', 'fulfilled', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos de ejemplo

-- Usuarios
INSERT INTO Users (name, email, password, is_admin)
VALUES 
    ('Alice', 'alice@example.com', 'password123', TRUE),
    ('Bob', 'bob@example.com', 'password123', FALSE),
    ('Carol', 'carol@example.com', 'password123', FALSE);

-- Categorías
INSERT INTO Categories (name, description)
VALUES 
    ('Ficción', 'Libros de ficción en general'),
    ('Ciencia', 'Libros de temas científicos'),
    ('Historia', 'Libros sobre historia');

-- Libros
INSERT INTO Books (title, author, isbn, published_date, category_id, quantity)
VALUES 
    ('El Quijote', 'Miguel de Cervantes', '9788491050563', '1605-01-16', 1, 5),
    ('Breve historia del tiempo', 'Stephen Hawking', '9788497369737', '1988-04-01', 2, 2),
    ('Historia de la humanidad', 'Hendrik Willem van Loon', '9788420415532', '1921-01-01', 3, 3);

-- Préstamos
INSERT INTO Loans (user_id, book_id, due_date, status)
VALUES 
    (2, 1, '2024-10-01', 'active'),
    (3, 2, '2024-11-01', 'returned');

-- Reservas
INSERT INTO Reservations (user_id, book_id, reservation_date, status)
VALUES 
    (2, 3, '2024-09-01', 'fulfilled'),
    (3, 1, '2024-09-05', 'pending');
