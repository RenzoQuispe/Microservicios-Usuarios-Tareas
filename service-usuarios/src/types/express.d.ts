export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        fotoperfil?: string;
        creado_en?: Date;
      };
    }
  }
}