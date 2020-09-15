package database

import (
	"fmt"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
	log "github.com/sirupsen/logrus"
)

func (r *Repository) GetUsers(filter *model.UserFilter) ([]*model.User, error) {
	log.Info("[UsersRepo] Getting Users by username")
	var users []*model.User

	query := r.DB.Model(&users)

	if filter.Username != nil && *filter.Username != "" {
		query.Where("username ILIKE ?", fmt.Sprintf("%%%s%%", *filter.Username))
	}

	if err := query.Select(); err != nil {
		log.Error("[DB] Could not get users", "  ", err)
		return nil, err
	}

	return users, nil
}

func (r *Repository) ByField(field, value string) (*model.User, error) {
	log.Info(URepo, " Getting user by field: ", field, " value: ", value)

	var user model.User
	if err := r.DB.Model(&user).Where(fmt.Sprintf("%v = ?", field), value).First(); err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *Repository) ByFieldOrField(fieldA, valueA, fieldB, valueB string) (*model.User, error) {
	log.Info("[UsersRepo] Getting user by field A:  ", fieldA, "  valueA:  ", valueA, "  OR  fieldB:  ", fieldB, "  valueB:  ", valueB)

	user, err := r.ByField(fieldA, valueA)
	if err != nil {
		log.Warn("Cannot find user by fieldA:  ", fieldA, "  valueA:  ", valueA, "attempting re-query with fieldB, valueB")

		user, err := r.ByField(fieldB, valueB)
		if err != nil {

			log.Error("Cannot find user by fieldA:  ", fieldA, "  valueA:  ", valueA, "OR fieldB:  ", fieldB, "  value:  ", valueB)
			return nil, err
		}

		return user, nil
	}

	return user, nil
}

func (r *Repository) UserByID(id string) (*model.User, error) {
	log.Info(URepo, " Getting user by id")
	return r.ByField("id", id)
}

func (r *Repository) ByEmail(email string) (*model.User, error) {
	log.Info(URepo, " Getting user by email")
	return r.ByField("email", email)
}

func (r *Repository) CreateUser(user *model.User) (*model.User, error) {
	log.Info(URepo, " Creating User")
	log.Info(URepo, " Beginning User CreateAuthor Transaction....")
	tx, err := r.DB.Begin()
	if err != nil {
		log.Error("[DB] could not begin create user transaction", err)
		return nil, err
	}
	defer tx.Rollback()

	_, err = tx.Model(user).Returning("*").Insert()
	if err != nil {
		log.Error("[DB] could create user ", "user: ", user, "   ", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return user, nil
}

func (r *Repository) UserByAuthor(author *model.Author) (*model.User, error) {
	log.Info(URepo, " Getting user by Author.creator_id")
	var user model.User

	err := r.DB.Model(&user).Where("id = ?", author.CreatorID).First()
	if err != nil {
		log.Error("[DB] could not find user where author_id: ", author.CreatorID, "   ", err)
		return nil, err
	}
	return &user, nil
}

func (r *Repository) ByQuote(quote *model.Quote) (*model.User, error) {
	log.Info(URepo, " Getting user by Quote.creator_id")

	var user model.User

	err := r.DB.Model(&user).Where("id = ?", quote.CreatorID).First()
	if err != nil {
		log.Error("[DB] could not find user where author_id: ", quote.CreatorID, "   ", err)
		return nil, err
	}
	return &user, nil
}

func (r *Repository) AddQuoteToFavourites(user *model.User) (*model.User, error) {
	log.Info(URepo, " Getting user by Quote.user_id")

	_, err := r.DB.Model(&user).Where("id = ?", user.ID).Returning("*").Update()
	if err != nil {
		log.Error("[DB] could not add favourites to users favourite list: ", user.ID, "   ", err)
		return nil, err
	}

	return user, nil
}



