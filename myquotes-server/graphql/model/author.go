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
	UserID    string    `json:"userID" validate:"required"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type AuthorRepository interface {
	Many(filter *AuthorFilter) ([]*Author, error)

	ByID(id string) (*Author, error)
	ByQuote(quote *Quote) (*Author, error)

	Create(author *Author) (*Author, error)
	Update(author *Author) (*Author, error)
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
