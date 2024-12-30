-- Este script crea las tablas y llena cada una con 20 datos ficticios.
BEGIN;

-- Crear la tabla 'book'
CREATE TABLE IF NOT EXISTS public."books" (
    isbn bigint NOT NULL,
    title character varying NOT NULL,
    author character varying NOT NULL,
    published_year integer,
    category_id text,
    CONSTRAINT books_pkey PRIMARY KEY (isbn)
);

-- Crear la tabla 'user'
CREATE TABLE IF NOT EXISTS public."users" (
    id serial NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    is_admin boolean DEFAULT FALSE,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Crear la tabla 'reservation'
CREATE TABLE IF NOT EXISTS public."reservations" (
    id serial NOT NULL,
    user_id integer NOT NULL,
    pickup_date date NOT NULL,
    return_date date NOT NULL,
    isbn bigint NOT NULL,
    cover character varying NOT NULL,
    CONSTRAINT reservations_pkey PRIMARY KEY (id),
    CONSTRAINT "FK_BOOKS" FOREIGN KEY (isbn) REFERENCES public."books" (isbn),
    CONSTRAINT "FK_USERS" FOREIGN KEY (user_id) REFERENCES public."users" (id)
);

-- Insertar 20 libros ficticios
INSERT INTO public.books (isbn, title, author, published_year, category_id)
VALUES
    (9781234567891, 'Book Title 1', 'Author 1', 2020, 'Fiction'),
    (9781234567892, 'Book Title 2', 'Author 2', 2021, 'Non-Fiction'),
    (9781234567893, 'Book Title 3', 'Author 3', 2019, 'Science'),
    (9781234567894, 'Book Title 4', 'Author 4', 2018, 'History'),
    (9781234567895, 'Book Title 5', 'Author 5', 2017, 'Fantasy'),
    (9781234567896, 'Book Title 6', 'Author 6', 2022, 'Mystery'),
    (9781234567897, 'Book Title 7', 'Author 7', 2020, 'Biography'),
    (9781234567898, 'Book Title 8', 'Author 8', 2023, 'Drama'),
    (9781234567899, 'Book Title 9', 'Author 9', 2021, 'Thriller'),
    (9781234567800, 'Book Title 10', 'Author 10', 2015, 'Romance'),
    (9781234567801, 'Book Title 11', 'Author 11', 2016, 'Adventure'),
    (9781234567802, 'Book Title 12', 'Author 12', 2014, 'Science Fiction'),
    (9781234567803, 'Book Title 13', 'Author 13', 2020, 'Comedy'),
    (9781234567804, 'Book Title 14', 'Author 14', 2018, 'Education'),
    (9781234567805, 'Book Title 15', 'Author 15', 2019, 'Art'),
    (9781234567806, 'Book Title 16', 'Author 16', 2023, 'Poetry'),
    (9781234567807, 'Book Title 17', 'Author 17', 2022, 'Children'),
    (9781234567808, 'Book Title 18', 'Author 18', 2021, 'Cookbook'),
    (9781234567809, 'Book Title 19', 'Author 19', 2020, 'Horror'),
    (9781234567810, 'Book Title 20', 'Author 20', 2013, 'Travel');

-- Insertar 20 usuarios ficticios
INSERT INTO public."users" (name, email, password)
VALUES
    ('User 1', 'user1@example.com', 'password1'),
    ('User 2', 'user2@example.com', 'password2'),
    ('User 3', 'user3@example.com', 'password3'),
    ('User 4', 'user4@example.com', 'password4'),
    ('User 5', 'user5@example.com', 'password5'),
    ('User 6', 'user6@example.com', 'password6'),
    ('User 7', 'user7@example.com', 'password7'),
    ('User 8', 'user8@example.com', 'password8'),
    ('User 9', 'user9@example.com', 'password9'),
    ('User 10', 'user10@example.com', 'password10'),
    ('User 11', 'user11@example.com', 'password11'),
    ('User 12', 'user12@example.com', 'password12'),
    ('User 13', 'user13@example.com', 'password13'),
    ('User 14', 'user14@example.com', 'password14'),
    ('User 15', 'user15@example.com', 'password15'),
    ('User 16', 'user16@example.com', 'password16'),
    ('User 17', 'user17@example.com', 'password17'),
    ('User 18', 'user18@example.com', 'password18'),
    ('User 19', 'user19@example.com', 'password19'),
    ('User 20', 'user20@example.com', 'password20');

-- Insertar 20 reservas ficticias
INSERT INTO public."reservations" (user_id, pickup_date, return_date, isbn)
VALUES
    (1, '2024-01-01', '2024-01-15', 9781234567891),
    (2, '2024-01-02', '2024-01-16', 9781234567892),
    (3, '2024-01-03', '2024-01-17', 9781234567893),
    (4, '2024-01-04', '2024-01-18', 9781234567894),
    (5, '2024-01-05', '2024-01-19', 9781234567895),
    (6, '2024-01-06', '2024-01-20', 9781234567896),
    (7, '2024-01-07', '2024-01-21', 9781234567897),
    (8, '2024-01-08', '2024-01-22', 9781234567898),
    (9, '2024-01-09', '2024-01-23', 9781234567899),
    (10, '2024-01-10', '2024-01-24', 9781234567800),
    (11, '2024-01-11', '2024-01-25', 9781234567801),
    (12, '2024-01-12', '2024-01-26', 9781234567802),
    (13, '2024-01-13', '2024-01-27', 9781234567803),
    (14, '2024-01-14', '2024-01-28', 9781234567804),
    (15, '2024-01-15', '2024-01-29', 9781234567805),
    (16, '2024-01-16', '2024-01-30', 9781234567806),
    (17, '2024-01-17', '2024-01-31', 9781234567807),
    (18, '2024-01-18', '2024-02-01', 9781234567808),
    (19, '2024-01-19', '2024-02-02', 9781234567809),
    (20, '2024-01-20', '2024-02-03', 9781234567810);

COMMIT;
