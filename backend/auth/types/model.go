package types

import "time"

type User struct {
	ID           int       `db:"id" json:"id"`
	Email        string    `db:"email" json:"email"`
	Name         string    `db:"name" json:"name"`
	PasswordHash string    `db:"password_hash" json:"-"`
	CreatedAt    time.Time `db:"created_at" json:"-"`
	UpdatedAt    time.Time `db:"updated_at" json:"-"`
}