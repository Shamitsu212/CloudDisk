package model

import "time"

type Folder struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateFolder struct {
	Name string `json:"name"`
}

type RenameFolder struct {
	NewName string `json:"new_name"`
}
