package middleware

import (
	"context"
	"net/http"
	"os"

	"github.com/JamieBShaw/myquotes-server/database"
	"github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	l "github.com/sirupsen/logrus"
)

const CurrentUserKey = "currentUser"

func AuthMiddleware(db *database.Repository) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			// get token
			token, err := parseToken(r)
			// If token could not be parsed from header or nil next handler

			if token == nil || err != nil {
				l.Warnf("ERROR parsing token: No token in request header, proceeding to next handler ", err)
				next.ServeHTTP(rw, r)
				return
			}
			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				//l.Info("Claims jit:  ", claims["jti"].(string))

				user, err := db.UserByID(claims["jti"].(string))
				if err != nil {
					next.ServeHTTP(rw, r)
					return
				}
				// add user to context
				ctx := context.WithValue(r.Context(), CurrentUserKey, user)
				r = r.WithContext(ctx)

				// next to the next handler with new request context
				next.ServeHTTP(rw, r)
			}
		})
	}
}

// Extracts "Authorization" from header and string Bear from token string
var authExtractor = &request.MultiExtractor{
	request.AuthorizationHeaderExtractor,
	request.ArgumentExtractor{"access_token"},
}

func parseToken(r *http.Request) (*jwt.Token, error) {
	// Parse the token from the request using jwt-go/request package
	jwtToken, err := request.ParseFromRequest(r, authExtractor, func(token *jwt.Token) (interface{}, error) {
		t := []byte(os.Getenv("SECRET"))
		return t, nil
	})
	if err != nil {
		return nil, err
	}
	return jwtToken, nil
}
