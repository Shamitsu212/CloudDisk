package service

import (
	"cloud_disk/db"
	"cloud_disk/internal/model"
	"errors"
)

type FolderService struct {
	repo *db.Database
}

func NewFolderService(repo *db.Database) *FolderService {
	return &FolderService{repo: repo}
}

func (s *FolderService) Create(userID int, req model.CreateFolderRequest) (*model.Folder, error) {
	if req.Name == "" {
		return nil, errors.New("Имя папки не может быть пустым")
	}

	folder := &model.Folder{
    	UserID:     userID,
    	Name:       req.Name,
    	Files:      []int{},
    	IsFavorite: false,
	}

	err := s.repo.CreateFolder(folder)
	return folder, err
}

func (s *FolderService) GetAll(userID int) ([]model.Folder, error) {
	return s.repo.GetFolders(userID)
}

func (s *FolderService) Delete(userID, folderID int) error {
	folder, err := s.repo.GetFolderByID(folderID, userID)
	if err != nil {
		return err
	}
	if folder == nil {
		return errors.New("Папка не найдена")
	}

	return s.repo.DeleteFolder(folderID, userID)
}

func (s *FolderService) ToggleFavorite(userID, folderID int) (bool, error) {
	folder, err := s.repo.GetFolderByID(folderID, userID)
	if err != nil {
		return false, err
	}
	if folder == nil {
		return false, errors.New("Папка не найдена")
	}

	return s.repo.ToggleFavorite(folderID, userID)
}

func (s *FolderService) Rename(userID, folderID int, newName string) error {
	if newName == "" {
		return errors.New("Новое имя не может быть пустым")
	}

	folder, err := s.repo.GetFolderByID(folderID, userID)
	if err != nil {
		return err
	}
	if folder == nil {
		return errors.New("Папка не найдена")
	}

	return s.repo.RenameFolder(folderID, userID, newName)
}
