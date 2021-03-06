CREATE TABLE quotes(
    id BIGSERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    date_of timestamptz,
    subject VARCHAR(55) NOT NULL,
    fav_count integer,
    author_id BIGSERIAL REFERENCES authors (id) ON DELETE CASCADE NOT NULL,
    creator_id BIGSERIAL REFERENCES users (id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

);
