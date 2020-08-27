package database

import (
	"fmt"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
	log "github.com/sirupsen/logrus"
)





func (r *Repository) GetAuthors(filter *model.AuthorFilter) ([]*model.Author, error) {
	log.Info(ARepo, " Getting Authors by subject and or name")

	var author []*model.Author

	query := r.DB.Model(&author)

	if filter != nil {

		if filter.Subject != nil && *filter.Subject != "" {
			query.Where("id = ?", filter.Subject)
		}

		if filter.Name != nil && *filter.Name != "" {
			query.Where("name ILIKE ?", fmt.Sprintf("%%%s%%", *filter.Name))
		}
	}
	if err := query.Select(); err != nil {
		log.Error("Could not find author with required fields", err)
		return nil, err
	}
	return author, nil
}

func (r *Repository) AuthorByID(id string) (*model.Author, error) {
	log.Info(ARepo, " Getting Author by id")

	var author model.Author
	if err := r.DB.Model(&author).Where("id = ?", id).Select(); err != nil {
		log.Error("Could not find author with id: ", id, " ", err)
	}
	return &author, nil
}

func (r *Repository) AuthorByQuote(quote *model.Quote) (*model.Author, error) {
	log.Info(ARepo, " Getting Authors where Quote.author_id is equal to Author.ID")

	var author model.Author

	if err := r.DB.Model(&author).Where("id = ?", quote.AuthorID).Select(); err != nil {
		log.Error("Could not find author with quote id ", quote.AuthorID, err)
		return nil, err
	}
	return &author, nil
}

func (r *Repository) CreateAuthor(author *model.Author) (*model.Author, error) {
	log.Info(ARepo, " Creating Author")

	_, err := r.DB.Model(&author).Returning("*").Insert()
	if err != nil {
		log.Error("Could not insert author", err)
		return nil, err
	}
	return author, nil
}

// Updates the entire author object, overwriting the row with new data
// Obviously if some of the cols haven't changed by an input these are simply overwritten
// but overwritten with the same data i.e. they do not change
// TODO: UpdateQuote function per field
func (r *Repository) UpdateAuthor(author *model.Author) (*model.Author, error) {
	log.Info(ARepo, " Updating Author, author ID:  ", author.ID)

	_, err := r.DB.Model(author).Update()
	if err != nil {
		log.Error("Unable to update author ", err)
		return nil, err
	}

	return author, nil
}

func (r *Repository) UpdateByField(field, value, id string) (*model.Author, error) {
	var author model.Author

	log.Info("FIELD:   ", field)
	log.Info("VALUE:  ", value)

	res, err := r.DB.Model(&author).Value(fmt.Sprintf("%s", field), fmt.Sprintf("%s", value)).Where("id = ?", id).Update()

	if err != nil {
		log.Error("ERROR:   ", err)
		return nil, err
	}

	log.Info("RESULT:   ", res)

	return &author, nil
}
