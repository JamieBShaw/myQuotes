package auth

import (
	"context"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
)

func (a *Auth) CreateAuthor(ctx context.Context, input model.AuthorCreateInput) (*model.Author, error) {
	log.Info("Beginning Author create process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	author := &model.Author{
		Name:   input.Name,
		Dob:    input.Dob,
		Dod:    input.Dod,
		CreatorID: user.ID,
	}

	_, err = a.Repo.CreateAuthor(author)
	if err != nil {
		return nil, GenericErr
	}

	log.Info("Author successfully created")
	return author, nil
}

//func (a *Auth) EditAuthor(ctx context.Context, input model.EditAuthor) (*model.Author, error) {
//log.Info("Beginning Author edit process.............")
//user, err := getUserFromCtx(ctx)
//if err != nil {
//return nil, AuthErr
//}

//authorInDB, err := a.authorRepo.AuthorByID(input.ID)
//if err != nil {
//return nil, GenericErr
//}
//// Check if user in ctx is the owner of the quote.user_id
//if authorInDB.UserID != user.ID {
//return nil, AuthErr
//}

//author := &model.Author{
//ID:        input.ID,
//Name:      *input.Name,
//UserID:    user.ID,
//UpdatedAt: time.Now().UTC(),
//}

//_, err = a.authorRepo.UpdateAuthor(author)
//if err != nil {
//return nil, GenericErr
//}

//return author, nil
//}

func (a *Auth) EditAuthorName(ctx context.Context, id string, name string) (*model.Author, error) {
	log.Info("Beginning Author edit name process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	author, err := a.Repo.AuthorByID(id)
	if err != nil {
		return nil, GenericErr
	}

	if author.CreatorID != user.ID {
		return nil, AuthErr
	}
	author.Name = name

	_, err = a.Repo.UpdateAuthor(author)

	// Cant get this to work yet
	//author, err = a.authorRepo.UpdateByField("name", name, id)
	log.Info("Author name successfully updated")
	return author, nil
}

func (a *Auth) EditAuthorSubject(ctx context.Context, id string, subject string) (*model.Author, error) {
	return nil, nil
}

func (a *Auth) EditAuthorDob(ctx context.Context, id string, dob time.Time) (*model.Author, error) {
	log.Info("Beginning Author edit DOB process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	author, err := a.Repo.AuthorByID(id)
	if err != nil {
		return nil, GenericErr
	}

	if author.CreatorID != user.ID {
		return nil, AuthErr
	}
	author.Dob = dob

	_, err = a.Repo.UpdateAuthor(author)

	log.Info("Author DOB successfully updated")
	return author, nil
}

func (a *Auth) EditAuthorDod(ctx context.Context, id string, dod time.Time) (*model.Author, error) {
	log.Info("Beginning Author DOD name process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}
	author, err := a.Repo.AuthorByID(id)
	if err != nil {
		return nil, GenericErr
	}

	if author.CreatorID != user.ID {
		return nil, AuthErr
	}
	author.Dod = dod

	_, err = a.Repo.UpdateAuthor(author)

	log.Info("Author DOD successfully updated")
	return author, nil
}


func (a *Auth) AddAuthorToFavourites(ctx context.Context, id string) ([]*model.Author, error) {
	log.Info("Beginning adding author to users favourites process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}

	err = a.Repo.AddAuthorToUsersFavourites(user.ID, id)
	if err != nil {
		log.Error("Error:  ", err)
		return nil, GenericErr
	}

	authors, err := a.Repo.GetUsersFavouriteAuthors(user.ID)
	if err != nil {
		log.Error("Error:   ", err)
		return nil, err
	}

	log.Info("Author added to favourites successfully updated")
	return authors, nil
}



func (a *Auth) RemoveAuthorFromFavourites(ctx context.Context, id string) ([]*model.Author, error) {
	log.Info("Beginning removing author from users favourites process.............")
	user, err := getUserFromCtx(ctx)
	if err != nil {
		return nil, AuthErr
	}

	err = a.Repo.AddAuthorToUsersFavourites(user.ID, id)
	if err != nil {
		log.Error("Error:  ", err)
		return nil, GenericErr
	}

	return nil, nil
}



