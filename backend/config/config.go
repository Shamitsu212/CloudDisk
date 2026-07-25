package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	App      AppConfig
	Database DatabaseConfig
	JWT      JWTConfig
}

type AppConfig struct {
	Port string
}

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SSLMode  string
}

type JWTConfig struct {
	Secret          string
	AccessTokenTTL  string
	RefreshTokenTTL string
}

func Load() *Config {

	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found")
	}

	return &Config{

		App: AppConfig{
			Port: getEnv("APP_PORT", "8080"),
		},

		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", "postgres"),
			Name:     getEnv("DB_NAME", "cloud_storage"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
		},

		JWT: JWTConfig{
			Secret:          getEnv("JWT_SECRET", "secret"),
			AccessTokenTTL:  getEnv("ACCESS_TOKEN_TTL", "15m"),
			RefreshTokenTTL: getEnv("REFRESH_TOKEN_TTL", "168h"),
		},

	}
	
}

func getEnv(key, defaultValue string) string {

	value := os.Getenv(key)

	if value == "" {
		return defaultValue
	}

	return value
}