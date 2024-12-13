import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { JWT_SECRET } from '@configs';
import { IRequest } from '@interfaces/express.interface';

import { decrypt, jwtExtractor } from '@utils/jwt';
import { buildUserRequest } from './request';

// Middleware to verify JWT
export function authenticated(req: IRequest, res: Response, next: NextFunction) {
  const token = jwtExtractor(req);

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decryptedToken: string = decrypt(token);
    const decodedToken: any = jwt.verify(decryptedToken, JWT_SECRET);

    if (decodedToken) {
      req = buildUserRequest(req, decodedToken.data);
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next();
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(401).json({ message: errorMessage || 'Invalid token' });
  }
}
