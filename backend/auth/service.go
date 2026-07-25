package auth

import (
	"errors"

	"cloud-storage-api/auth/jwt"
	"cloud-storage-api/auth/types"
	"cloud-storage-api/config"

	"github.com/jackc/pgx/v5"
)

type Service struct {
	repo *Repository
	cfg  *config.Config
}

func NewService(repo *Repository, cfg *config.Config) *Service {

	return &Service{
		repo: repo,
		cfg:  cfg,
	}
	
}

func (s *Service) Register(req types.RegisterRequest) (*types.AuthResponse, error) {

	_, err := s.repo.GetUserByEmail(req.Email)

	if err == nil {
		return nil, errors.New("user already exists")
	}

	if !errors.Is(err, pgx.ErrNoRows) {
		return nil, err
	}

	hash, err := jwt.HashPassword(req.Password)

	if err != nil {
		return nil, err
	}

	user := &types.User{
		Email:        req.Email,
		Name:         req.Name,
		PasswordHash: hash,
	}

	if err := s.repo.CreateUser(user); err != nil {
		return nil, err
	}

	token, err := jwt.GenerateAccessToken(user.ID, s.cfg)

	if err != nil {
		return nil, err
	}

	return &types.AuthResponse{
		AccessToken: token,
		User:        *user,
	}, nil

}

func (s *Service) Login(req types.LoginRequest) (*types.AuthResponse, error) {

	user, err := s.repo.GetUserByEmail(req.Email)

	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	if err := jwt.CheckPassword(req.Password, user.PasswordHash); err != nil {
		return nil, errors.New("invalid email or password")
	}

	token, err := jwt.GenerateAccessToken(user.ID, s.cfg)

	if err != nil {
		return nil, err
	}

	return &types.AuthResponse{
		AccessToken: token,
		User:        *user,
	}, nil

}