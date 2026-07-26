package model

import "time"

type User struct {
    ID           int       `json:"id"`
    Email        string    `json:"email"`
    Name         string    `json:"name"`
    PasswordHash string    `json:"-"`
    CreatedAt    time.Time `json:"-"`
    UpdatedAt    time.Time `json:"-"`
}

type RegisterRequest struct {
    Email    string `json:"email"`
    Name     string `json:"name"`
    Password string `json:"password"`
}

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type AuthResponse struct {
    AccessToken string `json:"accessToken"`
    User        User   `json:"user"`
}

type HealthResponse struct {
    Status  string `json:"status"`
    Message string `json:"message"`
}