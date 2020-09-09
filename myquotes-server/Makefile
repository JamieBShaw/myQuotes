gqlgen-gen:
	go run github.com/99designs/gqlgen generate --verbose
migrate-create-users:
	migrate create -ext sql -dir database/migrations create_user
migrate-create-authors:
	migrate create -ext sql -dir database/migrations create_authors
migrate-create-quotes:
	migrate create -ext sql -dir database/migrations create_quote
migrate-create-favourite-quotes:
	migrate create -ext sql -dir database/migrations create_favourite_quotes
migrate-create-favourite-authors:
	migrate create -ext sql -dir database/migrations create_favourite_authors


migrate-up:
	migrate -path "database/migrations" -database "postgres://myquotepostgres:myquotepostgres@localhost:5432/myquotes-db-dev?sslmode=disable" up
migrate-down:
	migrate -path "database/migrations" -database "postgres://myquotepostgres:myquotepostgres@localhost:5432/myquotes-db-dev?sslmode=disable" down
