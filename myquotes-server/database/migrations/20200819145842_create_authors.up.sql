CREATE TABLE authors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(55) UNIQUE NOT NULL,
    dob timestamptz,
    dod timestamptz,
    fav_count integer,
    creator_id BIGSERIAL references users (id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

);
