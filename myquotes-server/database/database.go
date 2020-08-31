package database

import (
	"context"
	"fmt"

	"github.com/go-pg/pg/v10"
)

type Repository struct {
	DB *pg.DB
}

type DBLogger struct{}

var (
	URepo = "[UserRepo] "
	ARepo = "[Repository] "
	QRepo = "[QuotesRepo] "
)

func Set(db *pg.DB) *Repository {
	return &Repository{
		DB: db,
	}
}

func (d DBLogger) BeforeQuery(ctx context.Context, q *pg.QueryEvent) (context.Context, error) {
	return ctx, nil
}

func (d DBLogger) AfterQuery(ctx context.Context, q *pg.QueryEvent) error {
	res, err := q.FormattedQuery()
	if err != nil {
		return err
	}
	fmt.Println("", string(res))
	return nil
}

func NewConf(opts *pg.Options) *pg.DB {
	return pg.Connect(opts)
}
