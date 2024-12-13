/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Router } from 'express';

import AuthController from '@controllers/auth.controller';
import { IRoutes } from '@interfaces/routes.interface';
import { validateResource } from '@middlewares/validateResource';
import { signUpSchema, signInSchema} from './validators';

class AuthRoutes implements IRoutes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/sign-up`,validateResource(signUpSchema), this.authController.signUp);
    this.router.post(`${this.path}/sign-in`, validateResource(signInSchema), this.authController.signIn);
  }
}

export default AuthRoutes;
