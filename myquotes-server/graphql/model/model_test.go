package model

import (
	"testing"
)

func TestUserValidation(t *testing.T) {
	u := &User{
		Email:    "james@mail.com",
		ID:       "1",
		Username: "mrAnderson",
		Password: "password",
	}
	err := u.Validate()
	if err != nil {
		t.Fatal(err)
	}
}

func TestRegisterInput(t *testing.T) {
	regIn := &RegisterInput{
		Email:           "james@mail.com",
		Username:        "mrAnderson",
		Password:        "password",
		ConfirmPassword: "password",
	}
	err := regIn.Validate()

	if err != nil {
		t.Fatal(err)
	}
}

func TestGenerateToken(t *testing.T) {
	u := &User{
		Email:    "james@mail.com",
		ID:       "1",
		Username: "jjb",
	}
	token, err := u.GenerateToken()
	if err != nil {
		t.Fatal(err)
	}

	if token.ExpiredAt.String() == "" {
		t.Fatal()
	}
}
