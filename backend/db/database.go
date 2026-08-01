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

func (d *Database) CreateFolder(folder *model.Folder) error {
	query := `INSERT INTO folders (user_id, name, is_favorite, parent_id) 
              VALUES ($1, $2, $3, $4) RETURNING id, created_at, updated_at`

	return d.db.QueryRow(query, folder.UserID, folder.Name,
		folder.IsFavorite, folder.ParentID).Scan(&folder.ID, &folder.CreatedAt, &folder.UpdatedAt)
}

func (d *Database) GetFolders(userID int) ([]model.Folder, error) {
	query := `SELECT id, user_id, name, is_favorite, parent_id, created_at, updated_at 
              FROM folders WHERE user_id = $1 ORDER BY created_at DESC`

	rows, err := d.db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var folders []model.Folder
	for rows.Next() {
		var f model.Folder
		err := rows.Scan(&f.ID, &f.UserID, &f.Name, &f.IsFavorite,
			&f.ParentID, &f.CreatedAt, &f.UpdatedAt)
		if err != nil {
			return nil, err
		}
		folders = append(folders, f)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return folders, nil
}

func (d *Database) GetFolderByID(folderID, userID int) (*model.Folder, error) {
	query := `SELECT id, user_id, name, is_favorite, parent_id, created_at, updated_at 
              FROM folders WHERE id = $1 AND user_id = $2`

	var f model.Folder
	err := d.db.QueryRow(query, folderID, userID).Scan(
		&f.ID, &f.UserID, &f.Name, &f.IsFavorite, &f.ParentID, &f.CreatedAt, &f.UpdatedAt)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	return &f, err
}

func (d *Database) DeleteFolder(folderID, userID int) error {
	query := `DELETE FROM folders WHERE id = $1 AND user_id = $2`
	result, err := d.db.Exec(query, folderID, userID)
	if err != nil {
		return err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (d *Database) ToggleFavorite(folderID, userID int) (bool, error) {
	var currentFavorite bool
	err := d.db.QueryRow(`SELECT is_favorite FROM folders WHERE id = $1 AND user_id = $2`,
		folderID, userID).Scan(&currentFavorite)
	if err != nil {
		return false, err
	}

	newStatus := !currentFavorite
	_, err = d.db.Exec(`UPDATE folders SET is_favorite = $1 WHERE id = $2 AND user_id = $3`,
		newStatus, folderID, userID)

	return newStatus, err
}

func (d *Database) RenameFolder(folderID, userID int, newName string) error {
	result, err := d.db.Exec(`UPDATE folders SET name = $1 WHERE id = $2 AND user_id = $3`,
		newName, folderID, userID)
	if err != nil {
		return err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return sql.ErrNoRows
	}
	return nil
}
