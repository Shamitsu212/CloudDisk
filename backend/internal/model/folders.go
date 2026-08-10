package model

import "time"

type Folder struct {
	ID         int       `json:"id"`
	UserID     int       `json:"user_id"`
	Name       string    `json:"name"`
	Files      []int     `json:"files"`
	LastUpdate time.Time `json:"lastUpdate"`
	IsFavorite bool      `json:"isFavorite"`
}

type CreateFolderRequest struct {
	Name string `json:"name"`
}

type RenameFolderRequest struct {
	Name string `json:"name"`
}

type FolderResponse struct {
	ID         int       `json:"id"`
	UserID     int       `json:"user_id"`
	Name       string    `json:"name"`
	Files      []int     `json:"files"`
	LastUpdate time.Time `json:"lastUpdate"`
	IsFavorite bool      `json:"isFavorite"`
}