/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config } from "dotenv";
config({ path: `.env` });

export const {
  PORT = 4001,
  NODE_ENV = "dev",
  CORS_ORIGIN = "http://localhost:3000",
  JWT_SECRET = "jwttest",
  JWT_EXPIRATION_IN_MINS = 30,
  REFRESH_SECRET = "jwttest",
} = process.env;
