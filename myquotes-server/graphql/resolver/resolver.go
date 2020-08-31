package resolver

import (
	"github.com/JamieBShaw/myquotes-server/graphql/auth"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	Auth auth.Auth
}

func NewResolver(auth auth.Auth) *Resolver {
	return &Resolver{
		Auth: auth,
	}
}
