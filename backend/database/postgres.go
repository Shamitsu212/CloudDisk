package database

import (
	"context"
	"fmt"
	"log"

	"cloud-storage-api/config"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func Connect(cfg *config.Config) error {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Database.Host,
		cfg.Database.Port,
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Name,
		cfg.Database.SSLMode,
	)

	pool, err := pgxpool.New(context.Background(), dsn)
	
	if err != nil {
		return err
	}

	if err := pool.Ping(context.Background()); err != nil {
		return err
	}

	DB = pool

	log.Println("PostgreSQL connected")

	return nil
}

func Close() {
	if DB != nil {
		DB.Close()
		log.Println("PostgreSQL connection closed")
	}
}