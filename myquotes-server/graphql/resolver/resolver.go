package resolver

import (
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	Repo model.Repository
}

func NewResolver(repo model.Repository, ) *Resolver {
	return &Resolver{
		Repo: repo,

	}
}
