import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    res.status(401).json({ error: 'Token mal formatado' });
    return;
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ error: 'Token mal formatado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as TokenPayload;
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};
