import { Response, Request } from "express";

import { handleError } from "@middlewares/handlers";
import AuthService from "@services/auth/auth.service";

class AuthController {
  public authService = new AuthService();

  public signIn = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const data = await this.authService.signIn(body, res);
      res.status(200).json(data);
    } catch (error) {
      handleError(res, error);
    }
  };

  public signUp = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const data = await this.authService.signUp(body);
      res.status(200).json(data);
    } catch (error) {
      handleError(res, error);
    }
  };
}

export default AuthController;
