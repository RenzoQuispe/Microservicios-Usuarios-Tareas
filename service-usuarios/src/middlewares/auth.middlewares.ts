import jwt from "jsonwebtoken";
import { db } from "../database";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();

export const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // verificar token
        const token = req.cookies.jwt_;
        if (!token) {
            res.status(401).json({ message: "Ruta no autorizada - No hay token :/" });
            return;
        }

        console.log("protectRoute token:", token);

        const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };

        if (!tokenDecodificado || !tokenDecodificado.userId) {
            res.status(401).json({ message: "Ruta no autorizada - Token inválido :/" });
            return;
        }

        const userId = tokenDecodificado.userId;
        console.log("protectRoute userId:", userId);

        // buscar al usuario en MySQL
        const [rows] = await db.query(
            'SELECT id, username, email, fotoperfil, creado_en FROM usuarios WHERE id = ?',
            [userId]
        );

        const usuarios = rows as any[];

        if (usuarios.length === 0) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // Guardamos los datos del usuario en la request
        req.user = usuarios[0];

        console.log("Usuario autenticado:", req.user);
        next();
    } catch (err) {
        console.error("Error en protectRoute:", err);
        res.status(500).json({ message: "Error en el servidor - protectRoute" });
    }
}