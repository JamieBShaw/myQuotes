package auth

import (
	"context"
	"errors"

	"github.com/99designs/gqlgen/graphql"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
	log "github.com/sirupsen/logrus"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (a *Auth) RegisterUser(ctx context.Context, input model.RegisterInput) (*model.AuthPayload, error) {
	log.Info("[Auth] Registering User ")
	if a == nil {
		return nil, errors.New("AUTH IS NIL")
	}

	_, err := a.Repo.ByField("email", input.Email)
	if err == nil {
		graphqlAddErrF(ctx, EmailErr.Error(), "email")

		return nil, err
	}

	_, err = a.Repo.ByField("username", input.Username)
	if err == nil {
		graphqlAddErrF(ctx, UsernameErr.Error(), "username")
		return nil, err
	}

	user := &model.User{
		Email:    input.Email,
		Username: input.Username,
	}

	// Returns hashPassword & adds to user struct
	err = user.HashPassword(input.Password)
	if err != nil {
		return nil, GenericErr
	}

	_, err = a.Repo.CreateUser(user)
	if err != nil {
		return nil, GenericErr
	}

	token, err := user.GenerateToken()
	if err != nil {
		return nil, GenericErr
	}

	user.IsLoggedIn = true

	log.Info("[Auth] User Successfully Registered")
	return &model.AuthPayload{
		AuthToken: token,
		User:      user,
	}, nil

}

func (a *Auth) LoginUser(ctx context.Context, input *model.LoginInput) (*model.AuthPayload, error) {
	log.Info("[Auth] Logging In User")

	user, err := a.Repo.ByFieldOrField("email", input.UsernameOrEmail, "username", input.UsernameOrEmail)
	if err != nil {

		graphqlAddErrF(ctx, LoginCredentials.Error(), "usernameOrEmail")
		return nil, nil
	}

	err = user.ValidatePassword(input.Password)
	if err != nil {
		graphqlAddErrF(ctx, LoginCredentials.Error(), "password")
		return nil, nil
	}

	err = user.Validate()
	if err != nil {
		graphqlAddErrF(ctx, LoginCredentials.Error(), "password")
		return nil, InputErr
	}

	token, err := user.GenerateToken()
	if err != nil {
		return nil, GenericErr
	}

	user.IsLoggedIn = true

	log.Info("[domain] User Logged In")
	return &model.AuthPayload{
		AuthToken: token,
		User:      user,
	}, nil
}


func (a *Auth) FavQuotesOfUser(ctx context.Context, user *model.User) ([]*model.Quote, error) {

	quotes, err := a.Repo.GetUsersFavouriteQuotes(user.ID)
	if err != nil {
		graphqlAddErrF(ctx, FavQuoteErr.Error(), "favouriteQuotes")
		return nil, err
	}

	return quotes, nil
}

func (a *Auth) FavAuthorsOfUser(ctx context.Context, user *model.User) ([]*model.Author, error) {

	authors, err := a.Repo.GetUsersFavouriteAuthors(user.ID)
	if err != nil {
		graphqlAddErrF(ctx, FavAuthErr.Error(), "favouriteAuthors")
		return nil, err
	}
	
	return authors, nil
}

func graphqlAddErrF(ctx context.Context, message, field string) {
	graphql.AddError(ctx, &gqlerror.Error{
		Message: message,
		Extensions: map[string]interface{}{
			"field": field,
		},
	})
}
