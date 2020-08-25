package auth

import (
	"context"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
)


func (a *Auth) CreateQuote(ctx context.Context, input model.QuoteCreateInput) (*model.Quote, error) {
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}

	quote := &model.Quote{
		AuthorID: input.AuthorID,
		Body:     input.Body,
		Subject:  &input.Subject,
		DateOf:   &input.DateOf,
		UserID:   user.ID,
	}

	// Will return the slice of quotes of the author we just inserted a quote for
	_, err = a.quoteRepo.Create(quote)
	if err != nil {
		return nil, err
	}

	return quote, nil
}

// ID of the quote will come with the request, will figure this out front-end, pretty basic to do is my assumption
func (a *Auth) EditQuote(ctx context.Context, input model.EditQuote) (*model.Quote, error) {
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}

	quoteInDB, err := a.quoteRepo.ByID(input.ID)
	if err!= nil {
		return nil, GenericErr
	}

	// Check if user in ctx is the owner of the quote.user_id
	if quoteInDB.UserID != user.ID {
		return nil, AuthErr
	}

	quote := &model.Quote{
		ID: input.ID,
		Body:     *input.Body,
		Subject:  input.Subject,
		DateOf:   input.DateOf,
		UserID:   user.ID,
	}
	
	_, err = a.quoteRepo.Update(quote)
	if err != nil {
		return nil, err
	}

	return quote, nil
}


// TODO: Implement edit quote for each field that is editable
func(a *Auth) EditQuoteBody(ctx context.Context, id string, body string) (*model.Quote, error) {
	return nil, nil
}

func (a *Auth) EditQuoteAuthor(ctx context.Context, id string, name string) (*model.Quote, error) {
	return nil, nil
}

func (a *Auth) EditQuoteSubject(ctx context.Context, id string, subject string) (*model.Quote, error) {
	return nil, nil
}

func (a *Auth) EditQuoteDateOf(ctx context.Context, id string, dateOf string) (*model.Quote, error) {
	return nil, nil
}
