import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    rol: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  // Leer el token que envia el cliente
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ ok: false, message: "Token expirado" });
  }

  //   token: Bearer
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ ok: false, message: "Token expirado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, message: "Token expirado" });
  }
}
