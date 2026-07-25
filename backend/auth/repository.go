package auth

import (
	"context"

	"cloud-storage-api/auth/types"
	"cloud-storage-api/database"
)

type Repository struct{}

func NewRepository() *Repository {
	return &Repository{}
}

func (r *Repository) CreateUser(user *types.User) error {
	query := `
		INSERT INTO users (email, name, password_hash)
		VALUES ($1, $2, $3)
		RETURNING id, created_at, updated_at
	`

	return database.DB.QueryRow(
		context.Background(),
		query,
		user.Email,
		user.Name,
		user.PasswordHash,
	).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
}

func (r *Repository) GetUserByEmail(email string) (*types.User, error) {
	query := `
		SELECT id, email, name, password_hash, created_at, updated_at
		FROM users
		WHERE email = $1
	`

	var user types.User

	err := database.DB.QueryRow(
		context.Background(),
		query,
		email,
	).Scan(
		&user.ID,
		&user.Email,
		&user.Name,
		&user.PasswordHash,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *Repository) GetUserByID(id int) (*types.User, error) {
	query := `
		SELECT id, email, name, password_hash, created_at, updated_at
		FROM users
		WHERE id = $1
	`

	var user types.User

	err := database.DB.QueryRow(
		context.Background(),
		query,
		id,
	).Scan(
		&user.ID,
		&user.Email,
		&user.Name,
		&user.PasswordHash,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}