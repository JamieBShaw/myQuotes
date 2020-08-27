package model

type Repository interface {
	UserRepository
	AuthorRepository
	QuoteRepository
}
