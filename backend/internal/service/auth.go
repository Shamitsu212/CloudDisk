package service

import (
	"errors"

	"cloud_disk/db"
	"cloud_disk/internal/model"
	"cloud_disk/internal/utils"
)

type AuthService struct {
	repo *db.Database
}

func NewAuthService(repo *db.Database) *AuthService {
	return &AuthService{repo: repo}
}

func (s *AuthService) Register(req model.RegisterRequest) (*model.AuthResponse, error) {

	exists, err := s.repo.Exists(req.Email)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("Пользователь уже существует")
	}

	hash, err := utils.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	user := &model.User{
		Email:        req.Email,
		Name:         req.Name,
		PasswordHash: hash,
	}

	if err := s.repo.Create(user); err != nil {
		return nil, err
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		return nil, err
	}

	return &model.AuthResponse{
		AccessToken: token,
		User:        *user,
	}, nil
}

func (s *AuthService) Login(req model.LoginRequest) (*model.AuthResponse, error) {

	user, err := s.repo.GetByEmail(req.Email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("Неправильные учетные данные")
	}

	if !utils.CheckPassword(req.Password, user.PasswordHash) {
		return nil, errors.New("Неправильные учетные данные")
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		return nil, err
	}

	return &model.AuthResponse{
		AccessToken: token,
		User:        *user,
	}, nil
}
