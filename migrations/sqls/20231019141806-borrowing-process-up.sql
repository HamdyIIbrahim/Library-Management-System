CREATE TABLE borrowing_processes (
    id SERIAL PRIMARY KEY ,
    book_id  INT REFERENCES books(id),
    borrower_id INT REFERENCES borrowers(id),
    borrow_date DATE,
    due_date DATE NOT NULL,
    borrower_returned BOOLEAN,
    over_due_date VARCHAR(50),
    created_at  TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
)