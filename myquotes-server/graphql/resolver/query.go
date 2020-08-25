package resolver

import (
	"context"

	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

type queryResolver struct{ *Resolver }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	return r.UserRepo.ById(id)
}

func (r *queryResolver) Users(ctx context.Context, filter *model.UserFilter) ([]*model.User, error) {
	return r.UserRepo.Many(filter)
}

func (r *queryResolver) Quote(ctx context.Context, id string) (*model.Quote, error) {
	return r.QuoteRepo.ByID(id)
}

func (r *queryResolver) Quotes(ctx context.Context, filter *model.QuoteFilter) ([]*model.Quote, error) {
	return r.QuoteRepo.Many(filter)
}

func (r *queryResolver) Author(ctx context.Context, id string) (*model.Author, error) {
	return r.AuthorRepo.ByID(id)
}

func (r *queryResolver) Authors(ctx context.Context, filter *model.AuthorFilter) ([]*model.Author, error) {
	return r.AuthorRepo.Many(filter)
}
