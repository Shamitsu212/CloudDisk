package auth

import (
	"cloud-storage-api/config"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.RouterGroup, cfg *config.Config) {
	repo := NewRepository()
	service := NewService(repo, cfg)
	handler := NewHandler(service)

	auth := router.Group("/auth")
	{
		auth.POST("/register", handler.Register)
		auth.POST("/login", handler.Login)
	}
}