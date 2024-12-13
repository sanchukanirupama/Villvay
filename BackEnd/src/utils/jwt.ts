import jwt from 'jsonwebtoken';
import { Request } from 'express';
import crypto from 'crypto';

import { JWT_EXPIRATION_IN_MINS, JWT_SECRET, REFRESH_SECRET } from '@configs';
import { IRequest } from '@interfaces/express.interface';
import { HttpException } from '@exceptions/http';

/**
 * Generates a token
 * @param {Object} dataObject - data object to encrypt
 */
export const generateUserLoginJwtToken = (dataObject: any) => {
  try {
    // Gets expiration time
    // @ts-ignore
    const jwtExpiration = Math.floor(Date.now() / 1000) + 60 * JWT_EXPIRATION_IN_MINS;

    // returns signed and encrypted token
    const accessToken = encrypt(
      jwt.sign(
        {
          data: dataObject,
          exp: jwtExpiration,
        },
        JWT_SECRET,
      ),
    );

    const refreshToken = jwt.sign({ data: dataObject }, REFRESH_SECRET, { expiresIn: `1d` });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const secret = JWT_SECRET || '';
const algorithm = 'aes-256-gcm';

/**
 * Encrypts text
 * @param {string} text - text to encrypt
 */
export const encrypt = (text = '') => {
  try {
    const key = crypto.scryptSync(secret, 'salt', 32);

    // Generate a random initialization vector (12 bytes for GCM)
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Get the authentication tag
    const authTag = cipher.getAuthTag().toString('hex');

    // Return the result as iv:encrypted:authTag
    return `${iv.toString('hex')}:${encrypted}:${authTag}`;
  } catch (err) {
    throw err;
  }
};

/**
 * Decrypts text
 * @param {string} text - text to decrypt
 */
export const decrypt = (encryptedText = '') => {
  try {
    const key = crypto.scryptSync(secret, 'salt', 32);

    // Split the input into IV, encrypted text, and auth tag
    const [ivHex, encrypted, authTagHex] = encryptedText.split(':');

    // Convert back to buffers
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    // Set the authentication tag before deciphering
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (err) {
    throw err;
  }
};

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
export const jwtExtractor = (req: Request) => {
  let token = null;
  if (req.headers?.authorization) {
    token = req.headers?.authorization.replace('Bearer ', '').trim();
  }
  return token;
};

// Middleware to verify JWT
export function canAccess(req: IRequest | any, res: Response | any, roles: string[]) {
  const { role } = req.user;
  if (roles.includes(role)) {
    return true;
  }
  throw new HttpException(409, 'NO_ACCESS');
}
