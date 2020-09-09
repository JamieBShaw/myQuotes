package model

type FavouriteQuotes struct {
	id string
	UserID string
	QuoteID string
}

type FavouriteAuthors struct {
	id string
	UserID string
	AuthorID string
}

type FavouriteRepository interface {
	 GetUsersFavouriteQuotes(id string) ([]*Quote, error)
	 GetUsersFavouriteAuthors(id string) ([]*Author, error)
	 AddQuoteToUsersFavourites(userID, quoteID string) error
	 AddAuthorToUsersFavourites(userID, authorID string) error
	 RemoveQuoteFromUsersFavourites(userID, quoteID string) error
	 RemoveAuthorFromUsersFavourites(userID, quoteID string) error
}