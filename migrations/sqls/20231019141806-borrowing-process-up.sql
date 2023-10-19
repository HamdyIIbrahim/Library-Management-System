CREATE TABLE borrowing_processes (
    id SERIAL PRIMARY KEY ,
    book_id  INT REFERENCES books(id),
    borrower_id INT REFERENCES borrowers(id),
    borrow_date TIMESTAMP,
    due_date INT NOT NULL,
    borrower_returned DATE,
    over_due_date TIMESTAMP
)