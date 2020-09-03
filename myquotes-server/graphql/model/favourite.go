package model

// TODO: Maybe spread favourite quotes and favourite authors apart?
type Favourite struct {
	id string
	UserID string
	Type bool
	item_quote_id string
	author_quote_id string
}

type FavouriteRepository interface {
	 GetUsersFavouriteQuotes(id string) ([]*Quote, error)
	 GetUsersFavouriteAuthors(id string) ([]*Author, error)
}