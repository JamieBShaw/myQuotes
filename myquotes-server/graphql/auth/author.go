package auth

import (
	"context"
	"time"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

func (a *Auth) CreateAuthor(ctx context.Context, input model.AuthorCreateInput) (*model.Author, error) {
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	author := &model.Author{
		Name:   input.Name,
		Dob:    input.Dob,
		Dod:    input.Dod,
		UserID: user.ID,
	}

	_, err = a.authorRepo.Create(author)
	if err != nil {
		return nil, GenericErr
	}

	return author, nil
}

func (a *Auth) EditAuthor(ctx context.Context, input model.EditAuthor) (*model.Author, error) {
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}

	authorInDB, err := a.authorRepo.ByID(input.ID)
	if err != nil {
		return nil, GenericErr
	}
	// Check if user in ctx is the owner of the quote.user_id
	if authorInDB.UserID != user.ID {
		return nil, AuthErr
	}

	author := &model.Author{
		ID:        input.ID,
		Name:      *input.Name,
		UserID:    user.ID,
		UpdatedAt: time.Now().UTC(),
	}

	_, err = a.authorRepo.Update(author)
	if err != nil {
		return nil, GenericErr
	}

	return author, nil
}

func (a *Auth) EditAuthorName(ctx context.Context, id string, name string) (*model.Author, error) {
	user, err  := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	author, err := a.authorRepo.ByID(id)
	if err != nil {
		return nil, GenericErr
	}

	if author.UserID != user.ID {
		return nil, AuthErr
	}
	// Set author.Name to new name
	author.Name = name

	// At the moment, returning the whole author object and updating all fields
	// even if those fields haven't all been changed
	_, err = a.authorRepo.Update(author)

	return author, nil
}

func (a *Auth) EditAuthorSubject(ctx context.Context, id string, subject string) (*model.Author, error) {
		return nil, nil
}

func (a *Auth) EditAuthorDob(ctx context.Context, id string, dob time.Time) (*model.Author, error) {
	return nil, nil
}

func (a *Auth) EditAuthorDod(ctx context.Context, id string, dod time.Time) (*model.Author, error) {
	return nil, nil
}
