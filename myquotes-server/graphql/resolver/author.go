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
func (a *authorResolver) Quotes(ctx context.Context, author *model.Author) ([]*model.Quote, error) {
	return a.QuoteRepo.ByAuthor(author)

}

// Returns Authors created by user, where User.ID == Author.user_id
func (a *authorResolver) User(ctx context.Context, author *model.Author) (*model.User, error) {
	return a.UserRepo.ByAuthor(author)
}

// TODO: Not sure what this is for specifically yet
func (r *authorResolver) Subject(ctx context.Context, obj *model.Author) (*string, error) {
	return nil, nil
}
