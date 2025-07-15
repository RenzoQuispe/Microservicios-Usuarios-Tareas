import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

export const createAccessToken = (userId: number, res: Response): string => {
    // crear token
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d", }
    );
    // enviar el token por cookie
    res.cookie("jwt_", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    return token;
};