package handlers

import (
	"encoding/json"
	"net/http"
	"service-reportes/services"
	"time"
)

type ResumenTarea struct {
	Titulo string `json:"titulo"`
	Fecha  string `json:"fecha"`
}

type Reporte struct {
	TotalTareas   int            `json:"total_tareas"`
	ListaResumen  []ResumenTarea `json:"lista_resumen"`
	MesProductivo string         `json:"mes_productivo"`
}

func GenerarReporte(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("jwt_")
	if err != nil {
		http.Error(w, "Falta token en cookie jwt_", http.StatusUnauthorized)
		return
	}
	token := cookie.Value

	tareas, err := services.ObtenerTareasDelUsuario(token)
	if err != nil {
		http.Error(w, "Error obteniendo tareas", http.StatusInternalServerError)
		return
	}

	// Crear resumen y contar tareas por mes
	resumen := []ResumenTarea{}
	mesConteo := map[string]int{}

	for _, t := range tareas {
		resumen = append(resumen, ResumenTarea{
			Titulo: t.Titulo,
			Fecha:  t.Fecha,
		})

		fecha, err := time.Parse("2006-01-02", t.Fecha)
		if err != nil {
			continue
		}
		mes := fecha.Format("2006-01")
		mesConteo[mes]++
	}

	// Determinar mes más productivo
	maxMes := ""
	maxCount := 0
	for mes, count := range mesConteo {
		if count > maxCount {
			maxCount = count
			maxMes = mes
		}
	}

	reporte := Reporte{
		TotalTareas:   len(tareas),
		ListaResumen:  resumen,
		MesProductivo: maxMes,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reporte)
}
