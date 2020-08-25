package database

import (
	"fmt"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
	"github.com/go-pg/pg/v10"
	log "github.com/sirupsen/logrus"
)

type UsersRepo struct {
	DB *pg.DB
}

func NewUserRepo(db *pg.DB) *UsersRepo {
	return &UsersRepo{DB: db}
}


func (u *UsersRepo) Many(filter *model.UserFilter) ([]*model.User, error) {
	log.Info("[UsersRepo] Getting Users by username")
	var users []*model.User

	query := u.DB.Model(&users)

	if filter.Username != nil && *filter.Username != "" {
		query.Where("username ILIKE ?", fmt.Sprintf("%%%s%%", *filter.Username))
	}

	if err := query.Select(); err != nil {
		log.Error("[DB] Could not get users", "  ", err)
		return nil, err
	}

	return users, nil
}


func (u *UsersRepo) ByField(field, value string) (*model.User, error) {
	log.Info(URepo, " Getting user by field: ", field, " value: ", value)

	var user model.User
	if err := u.DB.Model(&user).Where(fmt.Sprintf("%v = ?", field), value).First(); err != nil {
		return nil, err
	}
	return &user, nil
}


func (u *UsersRepo) ByFieldOrField(fieldA, valueA, fieldB, valueB string) (*model.User, error) {
	log.Info("[UsersRepo] Getting user by field A:  ", fieldA, "  valueA:  ", valueA, "  OR  fieldB:  ", fieldB, "  valueB:  ", valueB)

	user, err := u.ByField(fieldA, valueA)
	if err != nil {
		log.Warn("Cannot find user by fieldA:  ", fieldA, "  valueA:  ", valueA, "attempting re-query with fieldB, valueB")

		user, err := u.ByField(fieldB, valueB)
		if err != nil {

			log.Error("Cannot find user by fieldA:  ", fieldA, "  valueA:  ", valueA, "OR fieldB:  ", fieldB, "  value:  ", valueB)
			return nil, err
		}

		return user, nil
	}

	return user, nil
}



func (u *UsersRepo) ById(id string) (*model.User, error) {
	log.Info(URepo, " Getting user by id")
	return u.ByField("id", id)
}

func (u *UsersRepo) ByEmail(email string) (*model.User, error) {
	log.Info(URepo, " Getting user by email")
	return u.ByField("email", email)
}

func (u *UsersRepo) Create(user *model.User) (*model.User, error) {
	log.Info(URepo, " Creating User")
	log.Info(URepo, " Beginning User Create Transaction....")
	tx, err := u.DB.Begin()
	if err != nil {
		log.Error("[DB] could not begin create user transaction")
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

func (u *UsersRepo) ByAuthor(author *model.Author) (*model.User, error) {
	log.Info(URepo, " Getting user by Author.user_id")
	var user model.User

	err := u.DB.Model(&user).Where("id = ?", author.UserID).First()
	if err != nil {
		log.Error("[DB] could not find user where author_id: ", author.UserID, "   ", err)
		return nil, err
	}
	return &user, nil
}

func (u *UsersRepo) ByQuote(quote *model.Quote) (*model.User, error) {
	log.Info(URepo, " Getting user by Quote.user_id")

	var user model.User

	err := u.DB.Model(&user).Where("id = ?", quote.UserID).First()
	if err != nil {
		log.Error("[DB] could not find user where author_id: ", quote.UserID, "   ", err)
		return nil, err
	}
	return &user, nil
}
