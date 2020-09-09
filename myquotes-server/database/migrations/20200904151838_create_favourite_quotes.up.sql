CREATE TABLE favourite_quotes (
    id BIGSERIAL PRIMARY KEY,
    fav_count INTEGER,
    user_id BIGSERIAL references users (id) ON DELETE CASCADE NOT NULL,
    quote_id BIGSERIAL references quotes (id) ON DELETE CASCADE NOT NULL
)
