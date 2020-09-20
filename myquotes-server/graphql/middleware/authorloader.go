package middleware

import (
	"context"
	"github.com/JamieBShaw/myquotes-server/database"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
	"github.com/go-pg/pg/v10"
	log "github.com/sirupsen/logrus"
	"net/http"
	"time"
)

const authorLoaderKey = "authorLoaderKey"

func AuthorLoaderMiddleware(repo *database.Repository) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authorLoader := AuthorLoader{
				fetch: func(ids []string) ([]*model.Author, []error) {
					var author []*model.Author

					log.Info("Here second..................")

					err := repo.DB.Model(&author).Where("id in (?)", pg.In(ids)).Select()

					return author, []error{err}
				},
				wait:     1 * time.Microsecond,
				maxBatch: 75,
			}
			ctx := context.WithValue(r.Context(), authorLoaderKey, &authorLoader)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}

}

func GetAuthorLoader(ctx context.Context) *AuthorLoader {
	return ctx.Value(authorLoaderKey).(*AuthorLoader)
}
