package auth

import (
	"net/http"

	"cloud-storage-api/auth/types"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {

	return &Handler{
		service: service,
	}

}

// Register godoc
// @Summary Register a new user
// @Description Creates a new user account
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body types.RegisterRequest true "Register request"
// @Success 201 {object} types.AuthResponse
// @Failure 400 {object} map[string]string
// @Router /auth/register [post]
func (h *Handler) Register(c *gin.Context) {

	var req types.RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})

		return
	}

	resp, err := h.service.Register(req)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, resp)
}

// Login godoc
// @Summary Login
// @Description Login with email and password
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body types.LoginRequest true "Login request"
// @Success 200 {object} types.AuthResponse
// @Failure 401 {object} map[string]string
// @Router /auth/login [post]
func (h *Handler) Login(c *gin.Context) {
	var req types.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})

		return
	}

	resp, err := h.service.Login(req)

	if err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"message": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, resp)
}