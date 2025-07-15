db = db.getSiblingDB('tareas_db');
db.createCollection('tareas');
db.tareas.insertMany([
  {
    titulo: "Hacer las compras",
    descripcion: "Comprar leche, huevos, pan y frutas en el supermercado",
    fecha: ISODate("2025-07-16T17:00:00Z"),
    creado_por: 1,
    creado_en: new Date()
  },
  {
    titulo: "Sacar la basura",
    descripcion: "Sacar la basura antes de las 8:00 a.m. del martes",
    fecha: ISODate("2025-07-17T07:30:00Z"),
    creado_por: 1,
    creado_en: new Date()
  },
  {
    titulo: "Pagar servicios",
    descripcion: "Pagar luz, agua e internet antes de que venzan",
    fecha: ISODate("2025-07-18T12:00:00Z"),
    creado_por: 2,
    creado_en: new Date()
  },
  {
    titulo: "Llamar al doctor",
    descripcion: "Agendar cita médica para revisión anual de papá",
    fecha: ISODate("2025-07-19T10:30:00Z"),
    creado_por: 2,
    creado_en: new Date()
  },
  {
    titulo: "Ayudar con la tarea",
    descripcion: "Revisar tarea de matemáticas con los niños por la tarde",
    fecha: ISODate("2025-07-20T18:00:00Z"),
    creado_por: 3,
    creado_en: new Date()
  }
]);
