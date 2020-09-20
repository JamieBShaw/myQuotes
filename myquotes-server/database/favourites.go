package database

import (
	"github.com/JamieBShaw/myquotes-server/graphql/model"
	"github.com/go-pg/pg/v10"
	log "github.com/sirupsen/logrus"
)

func (r *Repository) GetUsersFavouriteQuotes(userId string) ([]*model.Quote, error) {

	var quotes []*model.Quote
	var favouriteQuoteIDs []*model.FavouriteQuotes

	err := r.DB.Model(&favouriteQuoteIDs).Column("quote_id").Where("user_id = ?", userId).Select()
	if err != nil {
		log.Error("Error 1:   ", err)
		return nil, err
	}

	var ids []string
	for _, favQuoteID := range favouriteQuoteIDs {
		ids = append(ids, favQuoteID.QuoteID)
	}

	if len(ids) == 0 {
		log.Warn("User currently has no favourites")
		return nil, nil
	}

	err = r.DB.Model(&quotes).Where("id in (?)", pg.In(ids)).Order("id").Select()
	if err != nil {
		log.Error("Error 2:  ", err.Error())
		return nil, err
	}

	return quotes, nil
}
func (r *Repository) GetUsersFavouriteAuthors(userId string) ([]*model.Author, error) {

	var authors []*model.Author
	var favouriteAuthorIDs []*model.FavouriteAuthors

	err := r.DB.Model(&favouriteAuthorIDs).Column("author_id").Where("user_id = ?", userId).Select()
	if err != nil {
		log.Error("Error:  ", err)
		return nil, err
	}

	var ids []string

	for _, favAuthorID := range favouriteAuthorIDs {
		ids = append(ids, favAuthorID.AuthorID)
		log.Info("ids:  ", ids)
	}

	if len(ids) == 0 {
		log.Warn("User currently has no favourites")
		return nil, nil
	}

	err = r.DB.Model(&authors).Where("id in (?)", pg.In(ids)).Order("id").Select()
	if err != nil {
		log.Error("Error 1234:  ", err)
		return nil, err
	}

	return authors, nil
}

func (r *Repository) AddQuoteToUsersFavourites(userID, quoteID string) error {

	favQuote := &model.FavouriteQuotes{
		UserID:  userID,
		QuoteID: quoteID,
	}
	var quote model.Quote

	_, err := r.DB.Model(favQuote).Where("user_id = ?", userID).Where("quote_id = ?", quoteID).Order("id").SelectOrInsert()
	if err != nil {
		log.Error("Error:  ", err)
	}

	favCount, err := r.DB.Model(favQuote).Where("quote_id = ?", quoteID).Count()
	if err != nil {
		log.Error("Error:  ", err)
		return err
	}

	log.Info("FAV_COUNT ON ADD:  ", favCount)
	quote.FavCount = int32(favCount)

	_, err = r.DB.Model(&quote).Column("fav_count").Where("id = ?", quoteID).Update()
	if err != nil {
		log.Error("Error:  ", err)
		return err
	}

	return nil
}

func (r *Repository) RemoveQuoteFromUsersFavourites(userID, quoteID string) error {

	var favQuote model.FavouriteQuotes
	var quote model.Quote

	_, err := r.DB.Model(&favQuote).Where("user_id = ?", userID).Where("quote_id = ?", quoteID).Delete()
	if err != nil {
		log.Error("Error:  ", err)
		return err
	}

	favCount, err := r.DB.Model(&favQuote).Where("quote_id = ?", quoteID).Count()
	if err != nil {
		log.Error("Error:  ", err)
		return err
	}

	log.Info("FAV_COUNT ON DELETE:  ", favCount)
	quote.FavCount = int32(favCount)

	_, err = r.DB.Model(&quote).Column("fav_count").Where("id = ?", quoteID).Update()
	if err != nil {
		log.Error("Error:  ", err)
		return err
	}

	return nil
}

func (r *Repository) AddAuthorToUsersFavourites(userID, authorID string) error {

	favAuthor := &model.FavouriteAuthors{
		UserID:   userID,
		AuthorID: authorID,
	}
	var author model.Author

	_, err := r.DB.Model(favAuthor).Where("user_id = ?", userID).Where("author_id = ?", authorID).Order("id").SelectOrInsert()
	if err != nil {
		log.Error("Error:  ", err)
		return err
	}

	favCount, err := r.DB.Model(favAuthor).Where("author_id = ?", authorID).Count()
	if err != nil {
		return err
	}

	author.FavCount = int32(favCount)
	_, err = r.DB.Model(&author).Column("fav_count").Where("id = ?", authorID).Update()
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) RemoveAuthorFromUsersFavourites(userID, authorID string) error {

	var favAuthor model.FavouriteAuthors
	var author model.Author

	_, err := r.DB.Model(&favAuthor).Where("user_id = ?", userID).Where("author_id = ?", authorID).Delete()
	if err != nil {
		log.Error("Error:  ", err)
		return err
	}

	favCount, err := r.DB.Model(&favAuthor).Where("author_id = ?", authorID).Count()
	if err != nil {
		return err
	}

	author.FavCount = int32(favCount)
	_, err = r.DB.Model(&author).Column("fav_count").Where("id = ?", authorID).Update()
	if err != nil {
		return err
	}

	return nil
}
