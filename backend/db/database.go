package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"cloud_disk/internal/model"

	"github.com/lib/pq"
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
    query := `
        INSERT INTO folders (user_id, name, is_favorite)
        VALUES ($1, $2, $3)
        RETURNING id, updated_at
    `

    err := d.db.QueryRow(
        query,
        folder.UserID,
        folder.Name,
        folder.IsFavorite,
    ).Scan(
        &folder.ID,
        &folder.LastUpdate,
    )

    if err != nil {
        return err
    }

    folder.Files = []int{}

    return nil
}

func (d *Database) GetFolders(userID int) ([]model.Folder, error) {
    query := `
        SELECT
            f.id,
            f.user_id,
            f.name,
            f.updated_at,
            f.is_favorite,
            COALESCE(
                ARRAY_AGG(files.id) FILTER (WHERE files.id IS NOT NULL),
                '{}'
            )
        FROM folders f
        LEFT JOIN files ON files.folder_id = f.id
        WHERE f.user_id = $1
        GROUP BY
            f.id,
            f.user_id,
            f.name,
            f.updated_at,
            f.is_favorite
        ORDER BY f.created_at DESC
    `

    rows, err := d.db.Query(query, userID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    folders := make([]model.Folder, 0)

    for rows.Next() {
        var folder model.Folder

        err := rows.Scan(
            &folder.ID,
            &folder.UserID,
            &folder.Name,
            &folder.LastUpdate,
            &folder.IsFavorite,
            pq.Array(&folder.Files),
        )

        if err != nil {
            return nil, err
        }

        folders = append(folders, folder)
    }

    if err = rows.Err(); err != nil {
        return nil, err
    }

    return folders, nil
}

func (d *Database) GetFolderByID(folderID, userID int) (*model.Folder, error) {
    query := `
        SELECT
            f.id,
            f.user_id,
            f.name,
            f.updated_at,
            f.is_favorite,
            COALESCE(
                ARRAY_AGG(files.id) FILTER (WHERE files.id IS NOT NULL),
                '{}'
            )
        FROM folders f
        LEFT JOIN files ON files.folder_id = f.id
        WHERE f.id = $1 AND f.user_id = $2
        GROUP BY
            f.id,
            f.user_id,
            f.name,
            f.updated_at,
            f.is_favorite
    `

    var folder model.Folder

    err := d.db.QueryRow(
        query,
        folderID,
        userID,
    ).Scan(
        &folder.ID,
        &folder.UserID,
        &folder.Name,
        &folder.LastUpdate,
        &folder.IsFavorite,
        pq.Array(&folder.Files),
    )

    if err == sql.ErrNoRows {
        return nil, nil
    }

    if err != nil {
        return nil, err
    }

    return &folder, nil
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

    err := d.db.QueryRow(
        `SELECT is_favorite
         FROM folders
         WHERE id = $1 AND user_id = $2`,
        folderID,
        userID,
    ).Scan(&currentFavorite)

    if err != nil {
        return false, err
    }

    newStatus := !currentFavorite

    _, err = d.db.Exec(
        `UPDATE folders
         SET is_favorite = $1, updated_at = NOW()
         WHERE id = $2 AND user_id = $3`,
        newStatus,
        folderID,
        userID,
    )

    if err != nil {
        return false, err
    }

    return newStatus, nil
}

func (d *Database) RenameFolder(folderID, userID int, newName string) error {
    result, err := d.db.Exec(
        `UPDATE folders
         SET name = $1, updated_at = NOW()
         WHERE id = $2 AND user_id = $3`,
        newName,
        folderID,
        userID,
    )

    if err != nil {
        return err
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }

    if rowsAffected == 0 {
        return sql.ErrNoRows
    }

    return nil
}
