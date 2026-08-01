package model

import "time"

type Folder struct {
	ID         int       `json:"id"`
	UserID     int       `json:"user_id"`
	Name       string    `json:"name"`
	IsFavorite bool      `json:"is_favorite"`
	ParentID   *int      `json:"parent_id,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type CreateFolderRequest struct {
	Name     string `json:"name"`
	ParentID *int   `json:"parent_id,omitempty"`
}

type RenameFolderRequest struct {
	NewName string `json:"new_name"`
}

type FolderResponse struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	IsFavorite bool   `json:"is_favorite"`
	ParentID   *int   `json:"parent_id,omitempty"`
}
