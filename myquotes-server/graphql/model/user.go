package model

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID                    string    `json:"id" validate:"required"`
	Username              string    `json:"username" validate:"required,max=42,min=2"`
	Email                 string    `json:"email" validate:"required,email"`
	Password              string    `json:"password" validate:"required"`
	IsLoggedIn            bool      `json:"isLoggedIn"`
	ExpoNotificationToken string    `json:"expoNotificationToken"`
	CreatedAt             time.Time `json:"-"`
	UpdatedAt             time.Time `json:"-"`
}

type UserRepository interface {
	GetUsers(filter *UserFilter) ([]*User, error)

	UserByID(id string) (*User, error)
	ByEmail(email string) (*User, error)
	UserByAuthor(author *Author) (*User, error)
	ByQuote(quote *Quote) (*User, error)
	ByField(field, value string) (*User, error)
	ByFieldOrField(fieldA, valueA, fieldB, valueB string) (*User, error)

	CreateUser(user *User) (*User, error)
}

type UserFilter struct {
	Username *string `json:"username"`
}

type RegisterInput struct {
	Username        string `json:"username" validate:"required,max=24,min=2"`
	Email           string `json:"email" validate:"required,email"`
	Password        string `json:"password" validate:"required,min=8"`
	ConfirmPassword string `json:"confirmPassword" validate:"required,eqcsfield=Password"`
}

func (u *User) GenerateToken() (*AuthToken, error) {

	expiredAt := time.Now().Add(time.Hour * 24 * 7) // week

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		ExpiresAt: expiredAt.Unix(),
		Id:        u.ID,
		IssuedAt:  time.Now().Unix(),
		Issuer:    "myquote",
	})

	accessToken, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return nil, err
	}

	return &AuthToken{
		AccessToken: accessToken,
		ExpiredAt:   expiredAt,
	}, nil
}

func (u *User) HashPassword(password string) error {
	bytePassword := []byte(password)
	hashPassword, err := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashPassword)
	return nil
}

func (u *User) ValidatePassword(password string) error {
	bytePassword := []byte(password)
	byteHashPassword := []byte(u.Password)
	return bcrypt.CompareHashAndPassword(byteHashPassword, bytePassword)
}
