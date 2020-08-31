package resolver

import (
	"context"

	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

type quoteResolver struct{ *Resolver }

// Quote returns generated.QuoteResolver implementation.
func (r *Resolver) Quote() generated.QuoteResolver { return &quoteResolver{r} }

// Returns the author of a specific quote by using quote.author_id
func (q *quoteResolver) Author(ctx context.Context, quote *model.Quote) (*model.Author, error) {
	return q.Auth.Repo.AuthorByQuote(quote)
}

// Returns the User where the User.ID == Quote.user_id
func (q *quoteResolver) User(ctx context.Context, quote *model.Quote) (*model.User, error) {
	return q.Auth.Repo.ByQuote(quote)
}
