CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) unique NOT NULL ,
    quantity INTEGER NOT NULL,
    shelf_location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
CREATE INDEX idx_title ON books (title);
CREATE INDEX idx_author ON books (author);
CREATE INDEX idx_ISBN ON books (ISBN);