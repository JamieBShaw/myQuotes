package auth

import (
	"context"
	"time"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
	log "github.com/sirupsen/logrus"
)

func (a *Auth) CreateQuote(ctx context.Context, input model.QuoteCreateInput) (*model.Quote, error) {
	log.Info("Beginning Quote create process.............")
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
	_, err = a.Repo.CreateQuote(quote)
	if err != nil {
		return nil, err
	}

	log.Info("Quote successfully created")
	return quote, nil
}

// ID of the quote will come with the request, will figure this out front-end, pretty basic to do is my assumption
func (a *Auth) EditQuote(ctx context.Context, input model.EditQuote) (*model.Quote, error) {
	log.Info("Beginning Quote edit process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}

	quoteInDB, err := a.Repo.QuoteByID(input.ID)
	if err != nil {
		return nil, GenericErr
	}

	// Check if user in ctx is the owner of the quote.user_id
	if quoteInDB.UserID != user.ID {
		return nil, AuthErr
	}

	quote := &model.Quote{
		ID:      input.ID,
		Body:    *input.Body,
		Subject: input.Subject,
		DateOf:  input.DateOf,
		UserID:  user.ID,
	}

	_, err = a.Repo.UpdateQuote(quote)
	if err != nil {
		return nil, err
	}

	log.Info("Quote successfully edited")
	return quote, nil
}

// TODO: Implement edit quote for each field that is editable
func (a *Auth) EditQuoteBody(ctx context.Context, id string, body string) (*model.Quote, error) {

	log.Info("Beginning Quote edit body process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	quote, err := a.Repo.QuoteByID(id)
	if err != nil {
		return nil, GenericErr
	}

	if quote.UserID != user.ID {
		return nil, AuthErr
	}
	quote.Body = body
	_, err = a.Repo.UpdateQuote(quote)

	log.Info("Quote body updated")
	return quote, nil
}

func (a *Auth) EditQuoteAuthor(ctx context.Context, id string, name string) (*model.Quote, error) {
	log.Info("Beginning Quote edit author name process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}

	quote, err := a.Repo.QuoteByID(id)
	if err != nil {
		return nil, GenericErr
	}

	if quote.UserID != user.ID {
		return nil, AuthErr
	}

	author, err := a.Repo.AuthorByID(quote.AuthorID)
	if err != nil {
		return nil, GenericErr
	}

	if quote.AuthorID != author.ID && quote.UserID != author.UserID {
		return nil, AuthErr
	}
	author.Name = name
	_, err = a.Repo.UpdateAuthor(author)

	log.Info("Quote author name updated")

	return quote, nil
}

func (a *Auth) EditQuoteSubject(ctx context.Context, id string, subject string) (*model.Quote, error) {
	log.Info("Beginning Quote edit subject process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	quote, err := a.Repo.QuoteByID(id)
	if err != nil {
		return nil, GenericErr
	}

	if quote.UserID != user.ID {
		return nil, AuthErr
	}
	quote.Subject = &subject
	_, err = a.Repo.UpdateQuote(quote)

	log.Info("Quote subject updated")
	return quote, nil
}

func (a *Auth) EditQuoteDateOf(ctx context.Context, id string, dateOf string) (*model.Quote, error) {
	log.Info("Beginning Quote edit dateof process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	quote, err := a.Repo.QuoteByID(id)
	if err != nil {
		return nil, GenericErr
	}

	if quote.UserID != user.ID {
		return nil, AuthErr
	}

	t, err := time.Parse("2006-01-02 15:04:05.000Z", dateOf)
	if err != nil {
		log.Error("Error parsing dateOf string", err)
		return nil, GenericErr
	}

	quote.DateOf = &t
	_, err = a.Repo.UpdateQuote(quote)

	log.Info("Quote dateOf updated")
	return quote, nil
}
