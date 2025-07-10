import express, { Request, Response } from 'express';
import { testDBConnection } from './database';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Servicio de usuarios activo');
});

async function iniciarServer() {
  await testDBConnection();

  app.listen(PORT, () => {
    console.log(`User-service ejecutándose en el puerto ${PORT}`);
  });
}

iniciarServer();
