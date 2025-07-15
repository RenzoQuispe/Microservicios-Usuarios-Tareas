package models

type Tarea struct {
	Titulo     string `json:"titulo"`
	Descripcion string `json:"descripcion"`
	Fecha      string `json:"fecha"`
	CreadoPor  int `json:"creado_por"`
	CreadoEn   string `json:"creado_en"`
}
