CREATE TABLE favourite_authors (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGSERIAL references users (id) ON DELETE CASCADE NOT NULL,
    author_id BIGSERIAL references authors (id) ON DELETE CASCADE NOT NULL
)
