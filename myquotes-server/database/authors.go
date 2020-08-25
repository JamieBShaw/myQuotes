package database

import (
	"fmt"

	"github.com/JamieBShaw/myquotes-server/graphql/model"
	"github.com/go-pg/pg/v10"
	log "github.com/sirupsen/logrus"
)

type AuthorsRepo struct {
	db *pg.DB
}

func NewAuthorRepo(db *pg.DB) *AuthorsRepo {
	return &AuthorsRepo{db: db}
}

func (a *AuthorsRepo) Many(filter *model.AuthorFilter) ([]*model.Author, error) {
	log.Info(ARepo, " Getting Authors by subject and or name")

	var author []*model.Author

	query := a.db.Model(&author)

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

func (a *AuthorsRepo) ByID(id string) (*model.Author, error) {
	log.Info(ARepo, " Getting Author by id")


	var author model.Author
	if err := a.db.Model(&author).Where("id = ?", id).Select(); err != nil {
		log.Error("Could not find author with id: ", id, " ", err)
	}
	return &author, nil
}

func (a *AuthorsRepo) ByQuote(quote *model.Quote) (*model.Author, error) {
	log.Info(ARepo, " Getting Authors where Quote.author_id is equal to Author.ID")

	var author model.Author

	if err := a.db.Model(&author).Where("id = ?", quote.AuthorID).Select(); err != nil {
		log.Error("Could not find author with quote id ", quote.AuthorID, err)
		return nil, err
	}
	return &author, nil
}

// TODO: use orm.Result and see if returning function does anything good
func (a *AuthorsRepo) Create(author *model.Author) (*model.Author, error) {
	log.Info(ARepo, " Creating Author")

	_, err := a.db.Model(&author).Returning("*").Insert()
	if err != nil {
		log.Error("Could not insert author", err)
		return nil, err
	}
	return author, nil
}

// Updates the entire author object, overwriting the row with new data
// Obviously if some of the cols haven't changed by an input these are simply overwritten
// but overwritten with the same data i.e. they do not change
// TODO: Update function per field
func (a *AuthorsRepo) Update(author *model.Author) (*model.Author, error) {
	log.Info(ARepo, " Updating Author, author ID:  ", author.ID )

	_ , err := a.db.Model(author).Update()
	if err != nil {
		return nil, err
	}

	return author, nil
}
