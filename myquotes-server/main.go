package main

import (
	"log"
	"net/http"
	"os"

	customMiddleware "github.com/JamieBShaw/myquotes-server/graphql/middleware"
	"github.com/rs/cors"

	authentication "github.com/JamieBShaw/myquotes-server/graphql/auth"
	"github.com/joho/godotenv"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"

	"github.com/JamieBShaw/myquotes-server/graphql/resolver"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/JamieBShaw/myquotes-server/database"
	"github.com/JamieBShaw/myquotes-server/graphql/generated"
	"github.com/go-pg/pg/v10"
)

const defaultPort = "8080"

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db := database.New(&pg.Options{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASS"),
		Database: os.Getenv("DB_NAME"),
	})

	userRepo := database.NewUserRepo(db)
	quoteRepo := database.NewQuoteRepo(db)
	authorRepo := database.NewAuthorRepo(db)

	defer db.Close()

	db.AddQueryHook(database.DBLogger{})

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	auth := authentication.NewAuth(userRepo, authorRepo, quoteRepo)
	baseResolver := resolver.NewResolver(userRepo, authorRepo, quoteRepo, auth)

	conf := generated.Config{
		Resolvers: baseResolver,
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(conf))

	router := chi.NewRouter()

	opts := cors.Options{
		AllowedOrigins:   []string{"http://localhost:8080"},
		AllowCredentials: true,
		Debug:            true,
	}

	router.Use(cors.New(opts).Handler)
	router.Use(middleware.RequestID)
	router.Use(middleware.Logger)
	router.Use(customMiddleware.AuthMiddleware(userRepo))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
