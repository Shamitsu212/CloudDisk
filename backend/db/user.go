package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"cloud_disk/internal/model"

	_ "github.com/lib/pq"
)

type Database struct {
    db *sql.DB
}

func NewDatabase() *Database {
    return &Database{}
}

func (r *Database) Connect() error {
    dsn := fmt.Sprintf(
        "host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
        os.Getenv("DB_SSLMODE"),
    )

    db, err := sql.Open("postgres", dsn)
    if err != nil {
        return err
    }

    if err = db.Ping(); err != nil {
        return err
    }

    r.db = db
    log.Println("База данных подключена")
    return nil
}

func (r *Database) Close() error {
    if r.db != nil {
        return r.db.Close()
    }
    return nil
}

func (r *Database) Create(user *model.User) error {
    query := `
        INSERT INTO users (email, name, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, created_at, updated_at
    `

    return r.db.QueryRow(
        query,
        user.Email,
        user.Name,
        user.PasswordHash,
    ).Scan(&user.ID, &user.CreatedAt, &user.UpdatedAt)
}

func (r *Database) GetByEmail(email string) (*model.User, error) {
    query := `
        SELECT id, email, name, password_hash, created_at, updated_at
        FROM users
        WHERE email = $1
    `

    var user model.User
    err := r.db.QueryRow(query, email).Scan(
        &user.ID,
        &user.Email,
        &user.Name,
        &user.PasswordHash,
        &user.CreatedAt,
        &user.UpdatedAt,
    )

    if err == sql.ErrNoRows {
        return nil, nil
    }
    if err != nil {
        return nil, err
    }

    return &user, nil
}

func (r *Database) Exists(email string) (bool, error) {
    var exists bool
    err := r.db.QueryRow(
        "SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)",
        email,
    ).Scan(&exists)
    return exists, err
}