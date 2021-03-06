package model

import (
	"time"
)

// GET Author from authorRepo WHERE Quotes.authorId == Author.ID

type Quote struct {
	ID        string     `json:"id" validate:"required"`
	Body      string     `json:"body" validate:"required"`
	AuthorID  string     `json:"authorId" validate:"required"`
	DateOf    *time.Time `json:"dateOf"`
	Subject   *string    `json:"subject"`
	FavCount  int32      `json:"favCount"`
	CreatorID string     `json:"creatorID" validate:"required"`
	CreatedAt time.Time  `json:"-"`
	UpdatedAt time.Time  `json:"-"`
}

type QuoteRepository interface {
	GetQuotes(filter *QuoteFilter, limit *int, offset *int) ([]*Quote, error)
	QuoteByID(id string) (*Quote, error)
	QuoteByAuthor(author *Author) ([]*Quote, error)

	CreateQuote(quote *Quote) (*Quote, error)
	UpdateQuote(quote *Quote) (*Quote, error)
}

type QuoteFilter struct {
	AuthorID  *string   `json:"authorId"`
	AuthorIds []*string `json:"authorIDs"`
	CreatorID *string   `json:"creatorId"`
	Subject   *string   `json:"subject"`
	FavCount  int32     `json:"favCount"`
	DateOf    *string   `json:"dateOf"`
	CreatedAt time.Time `json:"createdAt"`
}

type QuoteCreateInput struct {
	Body     string  `json:"body" validate:"required,max=164,min=1"`
	AuthorID string  `json:"authorId" validate:"required"`
	DateOf   *string `json:"dateOf"`
	Subject  string  `json:"subject"`
}
