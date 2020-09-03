CREATE TABLE favourites (
    id BIGSERIAL PRIMARY KEY,
    users_id BIGSERIAL references users (id) ON DELETE CASCADE NOT NULL UNIQUE ,
    item_type BOOLEAN NOT NULL,
    item_author_id BIGSERIAL references authors (id) ON DELETE CASCADE,
    item_quotes_id BIGSERIAL references quotes (id) ON DELETE CASCADE
)