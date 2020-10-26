package model

import (
	"regexp"

	"github.com/go-playground/validator"

	customValidator "github.com/JamieBShaw/myquotes-server/graphql/validator"
)

var emailRegexp = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

func (u *User) Validate() error {
	validate := validator.New()
	if err := validate.RegisterValidation("email", IsEmailValid); err != nil {
		return err
	}
	return validate.Struct(u)
}

func (r *RegisterInput) ValidateInput() error {
	validate := validator.New()
	if err := validate.RegisterValidation("email", IsEmailValid); err != nil {
		return err
	}
	return validate.Struct(r)
}

func IsEmailValid(fl validator.FieldLevel) bool {
	email := fl.Field().String()
	if !emailRegexp.MatchString(email) {
		return false
	}
	return true
}

func (r RegisterInput) Validate() (bool, map[string]string) {
	v := customValidator.New()

	v.Required("email", r.Email)
	v.IsEmail("email", r.Email)

	v.Required("password", r.Password)
	v.MinLength("password", r.Password, 6)

	v.Required("confirmPassword", r.ConfirmPassword)
	v.EqualToField("confirmPassword", r.ConfirmPassword, "password", r.Password)

	v.Required("username", r.Username)
	v.MinLength("username", r.Username, 2)

	return v.IsValid(), v.Errors
}

func (l LoginInput) Validate() (bool, map[string]string) {
	v := customValidator.New()

	v.Required("email", l.UsernameOrEmail)

	v.Required("password", l.Password)

	return v.IsValid(), v.Errors
}
