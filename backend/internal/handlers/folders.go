package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"cloud_disk/internal/model"
	"cloud_disk/internal/service"
)

type FolderHandler struct {
	service *service.FolderService
}

func NewFolderHandler(service *service.FolderService) *FolderHandler {
	return &FolderHandler{service: service}
}

func (h *FolderHandler) getUserID(r *http.Request) (int, error) {
	path := r.URL.Path
	parts := strings.Split(strings.Trim(path, "/"), "/")

	for i := 0; i < len(parts)-1; i++ {
		if parts[i] == "api" && i+2 < len(parts) && parts[i+1] == "v1" {
			if i+2 < len(parts) {
				userID, err := strconv.Atoi(parts[i+2])
				if err == nil {
					return userID, nil
				}
			}
		}
	}

	return 0, http.ErrNoCookie
}

func (h *FolderHandler) getUserAndFolderID(r *http.Request) (int, int, error) {
	path := r.URL.Path
	parts := strings.Split(strings.Trim(path, "/"), "/")

	var userID, folderID int
	var err error

	for i := 0; i < len(parts)-1; i++ {
		if parts[i] == "api" && i+2 < len(parts) && parts[i+1] == "v1" {
			userID, err = strconv.Atoi(parts[i+2])
			if err != nil {
				return 0, 0, err
			}
			if i+3 < len(parts) && parts[i+3] == "folders" {
				if i+4 < len(parts) {
					folderID, err = strconv.Atoi(parts[i+4])
					if err != nil {
						return 0, 0, err
					}
					break
				}
			}
		}
	}

	if userID == 0 || folderID == 0 {
		return 0, 0, http.ErrNoCookie
	}

	return userID, folderID, nil
}

func (h *FolderHandler) Create(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Метод не разрешен", http.StatusMethodNotAllowed)
		return
	}

	userID, err := h.getUserID(r)
	if err != nil {
		http.Error(w, "Неверный ID пользователя", http.StatusBadRequest)
		return
	}

	var req model.CreateFolderRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неправильный JSON", http.StatusBadRequest)
		return
	}

	folder, err := h.service.Create(userID, req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(folder)
}

func (h *FolderHandler) GetFolders(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Метод не разрешен", http.StatusMethodNotAllowed)
		return
	}

	userID, err := h.getUserID(r)
	if err != nil {
		http.Error(w, "Неверный ID пользователя", http.StatusBadRequest)
		return
	}

	folders, err := h.service.GetAll(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(folders)
}

func (h *FolderHandler) Delete(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Метод не разрешен", http.StatusMethodNotAllowed)
		return
	}

	userID, folderID, err := h.getUserAndFolderID(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.service.Delete(userID, folderID); err != nil {
		if err.Error() == "Папка не найдена" {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *FolderHandler) Favorite(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPatch {
		http.Error(w, "Метод не разрешен", http.StatusMethodNotAllowed)
		return
	}

	userID, folderID, err := h.getUserAndFolderID(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	newStatus, err := h.service.ToggleFavorite(userID, folderID)
	if err != nil {
		if err.Error() == "Папка не найдена" {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"is_favorite": newStatus,
	})
}

func (h *FolderHandler) RenameFolder(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPatch {
		http.Error(w, "Метод не разрешен", http.StatusMethodNotAllowed)
		return
	}

	userID, folderID, err := h.getUserAndFolderID(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var req model.RenameFolderRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неправильный JSON", http.StatusBadRequest)
		return
	}

	if err := h.service.Rename(userID, folderID, req.NewName); err != nil {
		if err.Error() == "Папка не найдена" {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
