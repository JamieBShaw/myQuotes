package resolver

import (
	"context"

	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

type userResolver struct{ *Resolver }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }


// TODO: HELP
// Returns slice of the quotes favourited by User where User.ID == favourite.user_ud and type == quote

// follow author resolver guidance
// - quotesByAuthor -> straight to quotes repo // we go straight to favourites repo
// = get all rows where USER.ID == user_id and bool true and column item_quote_id
//  = Then get all the quotes with those id's and return
func (r *userResolver) FavouriteQuotes(ctx context.Context, user *model.User) ([]*model.Quote, error) {
	return r.Auth.FavQuotesOfUser(ctx, user)
}

// Returns slice of the authors favourited by User where User.ID == favourite.user_ud and type == author
func (r *userResolver) FavouriteAuthors(ctx context.Context, user *model.User) ([]*model.Author, error) {
	return r.Auth.FavAuthorsOfUser(ctx, user)
}
