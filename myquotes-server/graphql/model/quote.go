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
	UserID    string     `json:"userID" validate:"required"`
	CreatedAt time.Time  `json:"-"`
	UpdatedAt time.Time  `json:"-"`
}

type QuoteRepository interface {
	GetQuotes(filter *QuoteFilter) ([]*Quote, error)
	QuoteByID(id string) (*Quote, error)
	QuoteByAuthor(author *Author) ([]*Quote, error)
	CreateQuote(quote *Quote) (*Quote, error)
	UpdateQuote(quote *Quote) (*Quote, error)
}

type QuoteFilter struct {
	AuthorID *string `json:"authorId"`
	UserID   *string `json:"userId"`
	Subject  *string `json:"subject"`
}

// GET UserID from logged in user ctx add it to CreateQuote quote struct

type QuoteCreateInput struct {
	Body     string    `json:"body" validate:"required,max=164,min=1"`
	AuthorID string    `json:"authorId" validate:"required"`
	DateOf   time.Time `json:"dateOf"`
	Subject  string    `json:"subject"`
}
