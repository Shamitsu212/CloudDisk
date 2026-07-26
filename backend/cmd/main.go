package main

import (
	"log"
	"net/http"
	"os"

	"cloud_disk/db"
	handler "cloud_disk/internal/handlers"
	"cloud_disk/internal/service"
	"cloud_disk/internal/utils"

	"github.com/joho/godotenv"
)

// CORS
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        // запросы с Vite + заголовок в headers
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
    mux := http.NewServeMux()

    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found, using environment variables")
    }

    utils.InitJWT()

    db := db.NewDatabase()
    if err := db.Connect(); err != nil {
        log.Fatal("Ошибка подключения к базе данных: ", err)
    }
    defer db.Close()

    authService := service.NewAuthService(db)
    authHandler := handler.NewAuthHandler(authService)

    mux.HandleFunc("POST /api/v1/auth/register", authHandler.Register)
    mux.HandleFunc("POST /api/v1/auth/login", authHandler.Login)
    mux.HandleFunc("GET /api/v1/health", authHandler.Health)

    port := os.Getenv("APP_PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Сервер запущен: http://localhost:%s", port)
    log.Printf("Состояние сервера: http://localhost:%s/api/v1/health", port)
    log.Printf("Регистрация: POST http://localhost:%s/api/v1/auth/register", port)
    log.Printf("Логин: POST http://localhost:%s/api/v1/auth/login", port)

    // оборачиваем маршруты в middleware
    handlerWithCors := corsMiddleware(mux)

    if err := http.ListenAndServe(":"+port, handlerWithCors); err != nil {
    	log.Fatal(err)
    }
}