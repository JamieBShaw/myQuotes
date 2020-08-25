package auth

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
	log "github.com/sirupsen/logrus"
)

func (a *Auth) RegisterUser(ctx context.Context, input model.RegisterInput) (*model.AuthPayload, error) {
	log.Info("[auth] Registering User ")

	_, err := a.userRepo.ByField("email", input.Email)
	if err == nil {
		graphql.AddErrorf(ctx, "Email %q already in use", input.Email)
		return nil, err
	}

	_, err = a.userRepo.ByField("username", input.Username)
	if err == nil {
		graphql.AddErrorf(ctx, "Username %q already in use", input.Username)
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

	_, err = a.userRepo.Create(user)
	if err != nil {
		return nil, GenericErr
	}

	token, err := user.GenerateToken()
	if err != nil {
		return nil, GenericErr
	}

	log.Info("[auth] User Successfully Registered")
	return &model.AuthPayload{
		AuthToken: token,
		User:      user,
	}, nil

}

func (a *Auth) LoginUser(ctx context.Context, input model.LoginInput) (*model.AuthPayload, error) {
	log.Info("[auth] Logging In User")

	user, err := a.userRepo.ByFieldOrField("email", input.UsernameOrEmail, "username", input.UsernameOrEmail)
	if err != nil {
		graphql.AddErrorf(ctx, "Could not find user with those details")
		return nil, err
	}

	err = user.ValidatePassword(input.Password)
	if err != nil {
		graphql.AddErrorf(ctx, "The email or password is incorrect")
		return nil, err
	}

	err = user.Validate()
	if err != nil {
		graphql.AddErrorf(ctx, "The email or password is incorrect")
		return nil, InputErr
	}

	token, err := user.GenerateToken()
	if err != nil {
		return nil, GenericErr
	}

	log.Info("[domain] User Logged In")
	return &model.AuthPayload{
		AuthToken: token,
		User:      user,
	}, nil
}
