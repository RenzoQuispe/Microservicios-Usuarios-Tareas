import { Request, Response } from "express";
import { db } from "../database";
import { createAccessToken } from "../libs/jwt";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    try {
        // validaciones básicas
        if (!username || !email || !password) {
            res.status(400).json({ message: "username, email y contraseña son requeridos" });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }
        // verificar si el email ya está en uso
        const [emailResult] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const emailRows = emailResult as any[];
        if (emailRows.length > 0) {
            res.status(409).json({ message: 'Correo en uso' });
            return;
        }
        // verificar si el username ya está en uso
        const [usernameResult] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
        const usernameRows = usernameResult as any[];
        if (usernameRows.length > 0) {
            res.status(409).json({ message: 'Username en uso' });
            return;
        }
        // hashear contraseña
        const hashedContraseña = await bcrypt.hash(password, 10);
        // insertar nuevo usuario
        const [insertResult] = await db.query(
            'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedContraseña]
        );
        const insertInfo = insertResult as { insertId: number }; // le decimos que insertInfo.insertId existe y es un numero
        const nuevoUsuarioId = insertInfo.insertId;
        // crear y enviar token
        createAccessToken(nuevoUsuarioId, res);
        res.status(200).json({
            id: nuevoUsuarioId,
            username: username,
            email: email,
            fotoperfil: ""
        });
        console.log("Registro exitoso :D")
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email])
        const emailEncontrados = result as any[];
        if (emailEncontrados.length === 0) {
            res.status(500).json({ error: 'No hay un usuario registrado con ese email' })
            return
        }
        const usuario = emailEncontrados[0];
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return
        }
        createAccessToken(usuario.id, res);
        res.status(200).json({
            id: usuario.id,
            username: usuario.username,
            email: usuario.email,
            fotoperfil: usuario.fotoperfil
        });
        console.log("Logeo exitoso :D")
    } catch (err) {
        console.error('Error al logear usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.cookie('jwt_', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(0),
            maxAge: 0
        });
        res.status(200).json({ message: "Cerró cesión correactamente :D" });
    } catch (err) {
        console.error('Error logout', err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
export const check = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        console.log("Erro check auth", err)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}