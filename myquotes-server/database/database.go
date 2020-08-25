package database

import (
	"context"
	"fmt"
	"github.com/go-pg/pg/v10"
)

type Database struct {

}

type DBLogger struct{}

var (
	URepo = "[UserRepo] "
	ARepo = "[AuthorsRepo] "
	QRepo = "[QuotesRepo] "
)

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

func New(opts *pg.Options) *pg.DB {
	return pg.Connect(opts)
}
