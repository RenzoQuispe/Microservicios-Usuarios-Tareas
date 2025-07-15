import express, { Request, Response } from 'express';
import { testDBConnection } from './database';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Servicio de usuarios activo');
});

app.use("/api/auth", authRoutes);

async function iniciarServer() {
  await testDBConnection();

  app.listen(PORT, () => {
    console.log(`User-service ejecutándose en el puerto ${PORT}`);
  });
}

iniciarServer();
