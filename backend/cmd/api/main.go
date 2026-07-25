package main

import (
	"log"

	"cloud-storage-api/config"
	"cloud-storage-api/database"
	"cloud-storage-api/router"
)

// @title Cloud Storage API
// @version 1.0
// @description REST API для Cloud Storage
// @BasePath /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {

	cfg := config.Load()

	if err := database.Connect(cfg); err != nil {
		log.Fatal(err)
	}

	defer database.Close()

	r := router.New(cfg)

	log.Printf("Server started on :%s", cfg.App.Port)

	if err := r.Run(":" + cfg.App.Port); err != nil {
		log.Fatal(err)
	}
}