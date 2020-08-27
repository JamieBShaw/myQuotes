package database

import (
	"github.com/JamieBShaw/myquotes-server/graphql/model"


	log "github.com/sirupsen/logrus"
)




func (r *Repository) GetQuotes(filter *model.QuoteFilter) ([]*model.Quote, error) {
	log.Info(QRepo, " Getting quote(s) by author_id and or subject")

	var quotes []*model.Quote

	query := r.DB.Model(&quotes)

	if filter != nil {
		if filter.AuthorID != nil {
			query.Where("author_id = ?", filter.AuthorID)
		}
		if filter.Subject != nil && *filter.Subject != "" {
			query.Where("subject = ?", filter.Subject)
		}
	}
	if err := query.Select(); err != nil {
		log.Error("Could not find quotes with required fields")
		return nil, err
	}

	return quotes, nil
}

func (r *Repository) QuoteByID(id string) (*model.Quote, error) {
	log.Info(QRepo, " Getting quote by id")

	var quote model.Quote

	if err := r.DB.Model(&quote).Where("id = ?", id).First(); err != nil {
		log.Error("[DB] Could not find quote", "id", id, "Error: ", err)
		return nil, err
	}

	return &quote, nil
}

func (r *Repository) QuoteByAuthor(author *model.Author) ([]*model.Quote, error) {
	log.Info(QRepo, " Getting quote(s) where author_id = author.ID")

	var quotes []*model.Quote
	err := r.DB.Model(&quotes).Where("author_id = ?", author.ID).Order("id").Select()
	if err != nil {
		log.Error("[DB] Could not find quote(s) for author ", "author_id: ", author.ID, " ---- ", err)
		return nil, err
	}

	return quotes, nil
}

// Returns slice of quotes from author we just inserted a quote, including inserted quote
func (r *Repository) CreateQuote(quote *model.Quote) (*model.Quote, error) {
	log.Info(QRepo, " CreateAuthor quote for author")

	// insert quote, author_id will link with Authors.ID  (GetUsers to One)
	res, err := r.DB.Model(quote).Returning("*").Insert()
	log.Info("[ORM RESULTS]   ", res)
	if err != nil {
		log.Error("[DB] could not insert quote for author  ", err)
		return nil, err
	}

	// NOT DOING THIS NOW, JUST RETURNING CREATE QUOTE
	// get quotes slice from author we just inserted a quote
	//quotes, err := q.GetUsers(&model.QuoteFilter{AuthorID: &quote.AuthorID})
	//if err != nil {
	//	log.Error("[DB] could not get quotes by author with id:  ", quote.AuthorID)
	//	return nil, err
	//}
	return quote, nil
}


func (r *Repository) UpdateQuote(quote *model.Quote) (*model.Quote, error) {
	log.Info(QRepo, " Updating quote, quote.ID:  ", quote.ID)

	_ , err := r.DB.Model(quote).Update()
	if err != nil {
		return nil, err
	}
	return quote, err
}
