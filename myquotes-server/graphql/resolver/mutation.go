package resolver

import (
	"context"
	"errors"
	log "github.com/sirupsen/logrus"
	"time"

	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

type mutationResolver struct{ *Resolver }



// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

func (r *mutationResolver) SetExpoNotifcationToken(ctx context.Context, id string) (bool, error) {
	log.Info("SETTING USERS EXPO PUSH TOKEN")
	return true, nil
}

func (r *mutationResolver) AddQuoteToFavourites(ctx context.Context, id string) ([]*model.Quote, error) {
	return r.Auth.AddQuoteToFavourites(ctx, id)
}

func (r *mutationResolver) RemoveQuoteFromFavourites(ctx context.Context, id string) ([]*model.Quote, error) {
	return r.Auth.RemoveQuoteFromFavourites(ctx, id)
}

func (r *mutationResolver) AddAuthorToFavourites(ctx context.Context, id string) ([]*model.Author, error) {
	return r.Auth.AddAuthorToFavourites(ctx, id)
}

func (r *mutationResolver) RemoveAuthorFromFavourites(ctx context.Context, id string) ([]*model.Author, error) {
	return r.Auth.RemoveAuthorFromFavourites(ctx, id)
}

func (r *mutationResolver) RegisterUser(ctx context.Context, input model.RegisterInput) (*model.AuthPayload, error) {
	isValid := validation(ctx, input)
	if !isValid {
		return nil, errors.New("Input errors")
	}

	return r.Auth.RegisterUser(ctx, input)
}
func (r *mutationResolver) LoginUser(ctx context.Context, input model.LoginInput) (*model.AuthPayload, error) {
	isValid := validation(ctx, input)
	if !isValid {
		return nil, errors.New("Input errors")
	}

	return r.Auth.LoginUser(ctx, &input)
}

func (r *mutationResolver) CreateQuote(ctx context.Context, input model.QuoteCreateInput) (*model.Quote, error) {
	return r.Auth.CreateQuote(ctx, input)
}
func (r *mutationResolver) CreateAuthor(ctx context.Context, input model.AuthorCreateInput) (*model.Author, error) {
	return r.Auth.CreateAuthor(ctx, input)
}

func (r *mutationResolver) EditQuoteBody(ctx context.Context, id string, body string) (*model.Quote, error) {
	return r.Auth.EditQuoteBody(ctx, id, body)
}

func (r *mutationResolver) EditQuoteAuthor(ctx context.Context, id string, name string) (*model.Quote, error) {
	return r.Auth.EditQuoteAuthor(ctx, id, name)
}

func (r *mutationResolver) EditQuoteSubject(ctx context.Context, id string, subject string) (*model.Quote, error) {
	return r.Auth.EditQuoteSubject(ctx, id, subject)
}

func (r *mutationResolver) EditQuoteDateOf(ctx context.Context, id string, dateOf string) (*model.Quote, error) {
	return r.Auth.EditQuoteDateOf(ctx, id, dateOf)
}

func (r *mutationResolver) EditAuthorName(ctx context.Context, id string, name string) (*model.Author, error) {
	return r.Auth.EditAuthorName(ctx, id, name)
}

func (r *mutationResolver) EditAuthorSubject(ctx context.Context, id string, subject string) (*model.Author, error) {
	return r.Auth.EditAuthorSubject(ctx, id, subject)
}

func (r *mutationResolver) EditAuthorDob(ctx context.Context, id string, dob time.Time) (*model.Author, error) {
	return r.Auth.EditAuthorDob(ctx, id, dob)
}

func (r *mutationResolver) EditAuthorDod(ctx context.Context, id string, dod time.Time) (*model.Author, error) {
	return r.Auth.EditAuthorDod(ctx, id, dod)
}
