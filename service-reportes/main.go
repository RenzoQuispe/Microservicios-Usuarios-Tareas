package main

import (
	"log"
	"net/http"
	"service-reportes/handlers"
)

func main() {
	http.HandleFunc("/reporte", handlers.GenerarReporte)

	log.Println("Microservicio de reportes escuchando en puerto 6001")
	err := http.ListenAndServe(":6001", nil)
	if err != nil {
		log.Fatal(err)
	}
}
