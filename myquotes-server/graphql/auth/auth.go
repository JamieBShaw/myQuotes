package auth

import (
	"context"
	"errors"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

// Authentication and queries or mutations that require auth must pass through auth package
type Auth struct {
	Repo model.Repository
}

// Literally don't need this interface, the generated.mutationResolver interface implements all these methods
// Why does it implement all these methods that require auth you ask? Well there all mutations and changing data
// In my application requires authentication and context of the user who is mutating that data so obvvvvvviously
// Now this all makes sense.
// Will keep this here as a reminder of my stupidity
type AuthServices interface {
	RegisterUser(ctx context.Context, input model.RegisterInput) (*model.AuthPayload, error)
	LoginUser(ctx context.Context, input model.LoginInput) (*model.AuthPayload, error)
	CreateQuote(ctx context.Context, input model.QuoteCreateInput) ([]*model.Quote, error)
	CreateAuthor(ctx context.Context, input model.AuthorCreateInput) (*model.Author, error)
}

func NewAuth(repo model.Repository) *Auth {
	return &Auth{
		Repo: repo,
	}
}

var (
	GenericErr = errors.New("Something went wrong")
	AuthErr    = errors.New("User not authenticated")
	InputErr   = errors.New("Input error")
)

// DO NOT TOUCH: Context struct is the same used in auth_middleware, must match!!
const CurrentUserKey = "currentUser"

func getUserFromCtx(ctx context.Context) (*model.User, error) {
	if ctx.Value(CurrentUserKey) == nil {
		return nil, errors.New("No User in context")
	}
	user, ok := ctx.Value(CurrentUserKey).(*model.User)

	if !ok || user.ID == "" {
		return nil, errors.New("No User in context")
	}
	return user, nil
}
