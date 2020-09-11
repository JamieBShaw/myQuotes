package resolver

import (
	"context"

	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

type userResolver struct{ *Resolver }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

// Returns slice of the quotes favourited by User where User.ID == favourite.user_ud and type == quote
func (r *userResolver) FavouriteQuotes(ctx context.Context, user *model.User) ([]*model.Quote, error) {
	return r.Auth.FavQuotesOfUser(ctx, user)
}

// Returns slice of the authors favourited by User where User.ID == favourite.user_ud and type == author
func (r *userResolver) FavouriteAuthors(ctx context.Context, user *model.User) ([]*model.Author, error) {
	return r.Auth.FavAuthorsOfUser(ctx, user)
}
