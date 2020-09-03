package database

import (
	"github.com/JamieBShaw/myquotes-server/graphql/model"
	"github.com/go-pg/pg/v10"
	log "github.com/sirupsen/logrus"
)
var (
	QUOTE_TYPE = true
	//AUTHOR_TYPE = false
)

func (r *Repository) GetUsersFavouriteQuotes(userId string) ([]*model.Quote, error) {

	var favourites []*model.Favourite
	var quotes []*model.Quote

	err := r.DB.Model(&favourites).Column("itemID").Where("userID = ?", userId).Where("type = ?", QUOTE_TYPE).Select()
	if err != nil {
		return nil, err
	}
	// favourites holds all the quoteID's the user has favourited

	err = r.DB.Model(&quotes).Where("id in (?)", pg.In(favourites)).Select()
	if err != nil {
		log.Info("ERROR FAV QUOTES:   ", favourites)
		return nil, err
	}

	return nil,nil
}
func (r *Repository) GetUsersFavouriteAuthors(userId string) ([]*model.Author, error) {


	return nil, nil
}