package resolver

import (
	"context"
	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

type authorResolver struct{ *Resolver }

// Author returns generated.AuthorResolver implementation.
func (r *Resolver) Author() generated.AuthorResolver { return &authorResolver{r} }

// Returns slice of the quotes by Author where Quote.author_id = Author.ID
func (a *authorResolver) Quotes(_ context.Context, author *model.Author) ([]*model.Quote, error) {
	return a.Auth.Repo.QuoteByAuthor(author)
	//return middleware.GetQuoteLoader(ctx).Load(author.ID)
}

// Returns Authors created by user, where User.ID == Author.user_id
func (a *authorResolver) User(_ context.Context, author *model.Author) (*model.User, error) {
	return a.Auth.Repo.UserByAuthor(author)
}

// TODO: Not sure what this is for specifically yet
func (a *authorResolver) Subject(_ context.Context, _ *model.Author) (*string, error) {
	//return a.AuthorRepo.BySubject(author)
	return nil, nil
}
