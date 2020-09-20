package middleware

import (
	"context"
	"github.com/JamieBShaw/myquotes-server/database"
	"github.com/JamieBShaw/myquotes-server/graphql/model"
	"github.com/go-pg/pg/v10"
	"net/http"
	"time"
)

const quoteLoaderKey = "quoteLoader"

func QuoteLoaderMiddleware(repo *database.Repository) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			quoteLoader := QuoteLoader{
				fetch: func(ids []string) ([][]*model.Quote, []error) {
					var quote [][]*model.Quote

					err := repo.DB.Model(&quote).Where("id in (?)", pg.In(ids)).Select()

					return quote, []error{err}
				},
				wait:     1 * time.Microsecond,
				maxBatch: 75,
			}

			ctx := context.WithValue(r.Context(), quoteLoaderKey, &quoteLoader)
			next.ServeHTTP(w, r.WithContext(ctx))

		})
	}

}


func GetQuoteLoader(ctx context.Context) *QuoteLoader {
	return ctx.Value(quoteLoaderKey).(*QuoteLoader)
}

//func QuoteLoaderMiddleware(repo *database.Repository) func(http.Handler) http.Handler {
//	return func(next http.Handler) http.Handler {
//		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//			quoteLoader := QuoteLoader{
//				fetch: func(ids []string) ([]*model.Quote, []error) {
//					var quote []*model.Quote
//
//					err := repo.DB.Model(&quote).Where("id in (?)", pg.In(ids)).Select()
//
//					return quote, []error{err}
//				},
//				wait:     1 * time.Microsecond,
//				maxBatch: 75,
//			}
//
//			ctx := context.WithValue(r.Context(), quoteLoaderKey, &quoteLoader)
//			next.ServeHTTP(w, r.WithContext(ctx))
//
//		})
//	}
//
//}
//
//
//func GetQuoteLoader(ctx context.Context) *QuoteLoader {
//	return ctx.Value(quoteLoaderKey).(*QuoteLoader)
//}