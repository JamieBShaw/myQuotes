package main

import (
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"

	"github.com/JamieBShaw/myquotes-server/graphql/auth"
	customMiddleware "github.com/JamieBShaw/myquotes-server/graphql/middleware"
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

	config := database.NewConf(&pg.Options{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASS"),
		Database: os.Getenv("DB_NAME"),
	})

	db := database.Set(config)

	defer db.DB.Begin()

	db.DB.AddQueryHook(database.DBLogger{})

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	auth := auth.NewAuth(db)
	baseResolver := resolver.NewResolver(*auth)

	conf := generated.Config{
		Resolvers: baseResolver,
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(conf))

	router := chi.NewRouter()

	opts := cors.Options{
		AllowedOrigins: []string{"http://localhost:8080/", "http://localhost:19003/",
			"exp://192.168.0.189:19000/", "exp://127.0.0.1:19000/",
			"http://localhost:19006/", "http://192.168.0.189:19006/",
			"http://localhost:19006", "http://192.168.0.189:19001",
			"exp://192.168.0.189:19000", "exp://192.168.0.189:19000", "192.168.0.189:8080",
				"192.168.0.189:8080"},
		AllowedMethods:         []string{"*"},
		AllowedHeaders:         []string{"*"},
		ExposedHeaders:         []string{"*"},
		AllowCredentials:       true,
		OptionsPassthrough:     true,
		Debug:                  true,
	}
	router.Use(cors.New(opts).Handler)
	router.Use(middleware.RequestID)
	router.Use(middleware.Logger)
	router.Use(customMiddleware.AuthMiddleware(db))
	//router.Use(customMiddleware.QuoteLoaderMiddleware(db))
	//router.Use(customMiddleware.AuthorLoaderMiddleware(db))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv )

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
