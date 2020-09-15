package resolver

import (
	"context"


	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

type queryResolver struct{ *Resolver }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

func (r *queryResolver) User(_ context.Context, id string) (*model.User, error) {
	return r.Auth.Repo.UserByID(id)
}

func (r *queryResolver) Users(_ context.Context, filter *model.UserFilter) ([]*model.User, error) {
	return r.Auth.Repo.GetUsers(filter)
}

func (r *queryResolver) Quote(_ context.Context, id string) (*model.Quote, error) {
	return r.Auth.Repo.QuoteByID(id)
}

func (r *queryResolver) Quotes(_ context.Context, filter *model.QuoteFilter, limit *int, offset *int) ([]*model.Quote, error) {
	return r.Auth.Repo.GetQuotes(filter, limit, offset)
}

func (r *queryResolver) Author(_ context.Context, id string) (*model.Author, error) {
	return r.Auth.Repo.AuthorByID(id)
}

func (r *queryResolver) Authors(_ context.Context, filter *model.AuthorFilter, limit *int, offset *int ) ([]*model.Author, error) {
	return r.Auth.Repo.GetAuthors(filter, limit, offset)
}
