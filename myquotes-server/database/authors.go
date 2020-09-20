package database

import (
	"fmt"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
	log "github.com/sirupsen/logrus"
)

const (
	createAuthorSQL = `INSERT INTO authors (name, creator_id, dob, dod) VALUES (?, ?, ?, ?);`
)

func (r *Repository) GetAuthors(filter *model.AuthorFilter, limit *int, offset *int) ([]*model.Author, error) {
	log.Info(ARepo, " Getting Authors by filter")

	var authors []*model.Author

	query := r.DB.Model(&authors)

	if filter != nil {

		if filter.Subject != nil && *filter.Subject != "" {
			query.Where("id = ?", filter.Subject)
		}

		if filter.Name != nil && *filter.Name != "" {
			query.Where("name ILIKE ?", fmt.Sprintf("%%%s%%", *filter.Name))
		}

		if filter.CreatorID != nil && *filter.CreatorID != "" {
			query.Where("creator_id = ?", filter.CreatorID)
		}
	}

	if limit != nil && offset != nil {
		query.Order("id").Limit(*limit).Offset(*offset)
	}
	err := query.Select()
	if err != nil {
		log.Error("Could not find author with required fields", err)
		return nil, err
	}

	// only return unique authors
	uniqueAuthors := unique(authors)
	return uniqueAuthors, nil
}

func (r *Repository) GetAuthorByName(name string) (*model.Author, error) {
	log.Info(ARepo, " Getting Author by name")
	var author model.Author

	err := r.DB.Model(&author).Where("name = ?", name).Select()
	if err != nil {
		return nil, err
	}

	return &author, nil
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

	_, err := r.DB.Model(&author).ExecOne(createAuthorSQL, author.Name, author.CreatorID, author.Dob, author.Dob)
	if err != nil {
		log.Error("Error:  ", err)
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

func unique(authors []*model.Author) []*model.Author {
	keys := make(map[*model.Author]bool)
	var list []*model.Author
	for _, author := range authors {
		if _, value := keys[author]; !value {
			keys[author] = true
			list = append(list, author)
		}
	}
	return list
}
