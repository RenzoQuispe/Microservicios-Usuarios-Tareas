import express from 'express'
import { testDBConnection } from './database';
import { Request, Response, NextFunction } from "express";

const app = express()
const PORT = process.env.PORT

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Servicio de usuarios activo');
});


app.listen(PORT, async () => {
  console.log(`User-service ejecutandose en el puerto  ${PORT}`);
  await testDBConnection();
})
