package resolver

import (
	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	UserRepo   model.UserRepository
	AuthorRepo model.AuthorRepository
	QuoteRepo  model.QuoteRepository
	//Auth       auth.AuthServices
	Auth       generated.MutationResolver
}

func NewResolver(UserRepo model.UserRepository, AuthorRepo model.AuthorRepository, QuoteRepo model.QuoteRepository, Auth generated.MutationResolver) *Resolver {
	return &Resolver{
		UserRepo:   UserRepo,
		AuthorRepo: AuthorRepo,
		QuoteRepo:  QuoteRepo,
		Auth: Auth,
	}
}
