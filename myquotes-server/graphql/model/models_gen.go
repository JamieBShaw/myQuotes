// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"time"
)

type AuthPayload struct {
	AuthToken *AuthToken `json:"authToken"`
	User      *User      `json:"user"`
}

type AuthToken struct {
	AccessToken string    `json:"accessToken"`
	ExpiredAt   time.Time `json:"expiredAt"`
}

type EditAuthor struct {
	ID      string  `json:"id"`
	Name    *string `json:"name"`
	Subject *string `json:"subject"`
}

type EditQuote struct {
	ID      string  `json:"id"`
	Body    *string `json:"body"`
	Author  *string `json:"author"`
	DateOf  *string `json:"dateOf"`
	Subject *string `json:"subject"`
}

type LoginInput struct {
	UsernameOrEmail string `json:"usernameOrEmail"`
	Password        string `json:"password"`
}
