package model

import (
	"regexp"

	"github.com/go-playground/validator"
)

var emailRegexp = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

func (u *User) Validate() error {
	validate := validator.New()
	if err := validate.RegisterValidation("email", IsEmailValid); err != nil {
		return err
	}
	return validate.Struct(u)
}

func (reg *RegisterInput) Validate() error {
	validate := validator.New()
	if err := validate.RegisterValidation("email", IsEmailValid); err != nil {
		return err
	}
	return validate.Struct(reg)
}

func IsEmailValid(fl validator.FieldLevel) bool {
	email := fl.Field().String()
	if !emailRegexp.MatchString(email) {
		return false
	}
	return true
}
