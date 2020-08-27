package resolver

import (
	"context"
	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
	"time"
)

type mutationResolver struct{ *Resolver }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

func (r *mutationResolver) RegisterUser(ctx context.Context, input model.RegisterInput) (*model.AuthPayload, error) {
	return r.RegisterUser(ctx, input)
}
func (r *mutationResolver) LoginUser(ctx context.Context, input model.LoginInput) (*model.AuthPayload, error) {
	return r.LoginUser(ctx, input)
}
func (r *mutationResolver) CreateQuote(ctx context.Context, input model.QuoteCreateInput) (*model.Quote, error) {
	return r.CreateQuote(ctx, input)
}
func (r *mutationResolver) CreateAuthor(ctx context.Context, input model.AuthorCreateInput) (*model.Author, error) {
	return r.CreateAuthor(ctx, input)
}

func (r *mutationResolver) EditQuoteBody(ctx context.Context, id string, body string) (*model.Quote, error) {
	return r.EditQuoteBody(ctx, id, body)
}

func (r *mutationResolver) EditQuoteAuthor(ctx context.Context, id string, name string) (*model.Quote, error) {
	return r.EditQuoteAuthor(ctx, id, name)
}

func (r *mutationResolver) EditQuoteSubject(ctx context.Context, id string, subject string) (*model.Quote, error) {
	return r.EditQuoteSubject(ctx, id, subject)
}

func (r *mutationResolver) EditQuoteDateOf(ctx context.Context, id string, dateOf string) (*model.Quote, error) {
	return r.EditQuoteDateOf(ctx, id, dateOf)
}

func (r *mutationResolver) EditAuthorName(ctx context.Context, id string, name string) (*model.Author, error) {
	return r.EditAuthorName(ctx, id, name)
}

func (r *mutationResolver) EditAuthorSubject(ctx context.Context, id string, subject string) (*model.Author, error) {
	return r.EditAuthorSubject(ctx, id, subject)
}

func (r *mutationResolver) EditAuthorDob(ctx context.Context, id string, dob time.Time) (*model.Author, error) {
	return r.EditAuthorDob(ctx, id, dob)
}

func (r *mutationResolver) EditAuthorDod(ctx context.Context, id string, dod time.Time) (*model.Author, error) {
	return r.EditAuthorDod(ctx, id, dod)
}

