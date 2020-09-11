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

func NewAuth(repo model.Repository) *Auth {
	return &Auth{
		Repo: repo,
	}
}

var (
	GenericErr       = errors.New("Something went wrong")
	AuthErr          = errors.New("User not authenticated")
	InputErr         = errors.New("Input error")
	EmailErr         = errors.New("Email already in use")
	UsernameErr      = errors.New("Username already in use")
	LoginCredentials = errors.New("Could not find user with those credentials")
	FavAuthErr = errors.New("Could not find users favourite authors")
	FavQuoteErr = errors.New("Could not find users favourite quotes")
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
