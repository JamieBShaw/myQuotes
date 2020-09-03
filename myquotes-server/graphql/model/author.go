package model

import (
	"time"
)

// Get Quotes from quotes repo WHERE Quotes.authorId == Author.ID

type Author struct {
	ID        string    `json:"id" validate:"required"`
	Name      string    `json:"name" validate:"required,max=42,min=2"`
	Dob       time.Time `json:"dob"`
	Dod       time.Time `json:"dod"`
	UserID    string    `json:"userID"`
	CreatedID string    `json:"createdID" validate:"required"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type AuthorRepository interface {
	GetAuthors(filter *AuthorFilter) ([]*Author, error)

	AuthorByID(id string) (*Author, error)
	AuthorByQuote(quote *Quote) (*Author, error)

	CreateAuthor(author *Author) (*Author, error)
	UpdateAuthor(author *Author) (*Author, error)
	UpdateByField(field, value, id string) (*Author, error)
}

type AuthorFilter struct {
	Name    *string `json:"name"`
	Subject *string `json:"subject"`
}

type AuthorCreateInput struct {
	Name string    `json:"name" validate:"required,max=42,min=2"`
	Dob  time.Time `json:"dob"`
	Dod  time.Time `json:"dod"`
}
