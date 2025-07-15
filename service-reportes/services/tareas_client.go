package services

import (
	"log"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"os"
	"service-reportes/models"
)

func ObtenerTareasDelUsuario(token string) ([]models.Tarea, error) {

	url := os.Getenv("TAREAS_SERVICE_URL")

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Cookie", "jwt_=" + token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error en client.Do:", err)
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	log.Println("Respuesta cruda:", string(body))

	if resp.StatusCode != http.StatusOK {
		log.Printf("Status inesperado: %d", resp.StatusCode)
		return nil, errors.New("respuesta no OK")
	}

	var tareas []models.Tarea
	err = json.Unmarshal(body, &tareas)
	if err != nil {
		log.Println("Error al parsear JSON:", err)
	}
	return tareas, err
}
