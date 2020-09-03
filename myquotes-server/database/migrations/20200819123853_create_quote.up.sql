CREATE TABLE quotes(
    id BIGSERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    date_of DATE,
    subject VARCHAR(55) NOT NULL,
    author_id BIGSERIAL REFERENCES authors (id) ON DELETE CASCADE NOT NULL,
    created_id BIGSERIAL references users (id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

);
