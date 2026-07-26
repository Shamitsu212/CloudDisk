package handler

import (
	"encoding/json"
	"net/http"

	"cloud_disk/internal/model"
	"cloud_disk/internal/service"
)

type AuthHandler struct {
    service *service.AuthService
}

func NewAuthHandler(service *service.AuthService) *AuthHandler {
    return &AuthHandler{service: service}
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Метод неразрешен", http.StatusMethodNotAllowed)
        return
    }

    var req model.RegisterRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Неправильный JSON", http.StatusBadRequest)
        return
    }

    // Базовая валидация
    if req.Email == "" || req.Password == "" || req.Name == "" {
        http.Error(w, "Все поля должны быть заполнены", http.StatusBadRequest)
        return
    }

    resp, err := h.service.Register(req)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(resp)
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Метод неразрешен", http.StatusMethodNotAllowed)
        return
    }

    var req model.LoginRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Неправильный JSON", http.StatusBadRequest)
        return
    }

    if req.Email == "" || req.Password == "" {
        http.Error(w, "Email и пароль должны быть заполнены", http.StatusBadRequest)
        return
    }

    resp, err := h.service.Login(req)
    if err != nil {
        http.Error(w, "Неправильные учетные данные", http.StatusUnauthorized)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(resp)
}

func (h *AuthHandler) Health(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        http.Error(w, "Метод неразрешен", http.StatusMethodNotAllowed)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(model.HealthResponse{
        Status:  "OK",
        Message: "Сервер запущен",
    })
}