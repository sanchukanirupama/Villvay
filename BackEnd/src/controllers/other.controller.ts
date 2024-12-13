import { Response, Request } from "express";

import { handleError } from "@middlewares/handlers";
import OtherService from "@services/auth/other.service";
import { canAccess } from "@utils/jwt";
import { ROLE } from "@constants/roles";

class OtherController {
  public otherService = new OtherService();

  public public = async (req: Request, res: Response) => {
    try {
      const data = await this.otherService.public();
      res.status(200).json(data);
    } catch (error) {
      handleError(res, error);
    }
  };

  public getUserData = async (req: Request, res: Response) => {
    try {
      canAccess(req, res, [ROLE.USER, ROLE.ADMIN]);
      const data = await this.otherService.getUserData();
      res.status(200).json(data);
    } catch (error) {
      handleError(res, error);
    }
  };

  public getAdminData = async (req: Request, res: Response) => {
    try {
      canAccess(req, res, [ROLE.ADMIN]);
      const data = await this.otherService.getAdminData();
      res.status(200).json(data);
    } catch (error) {
      handleError(res, error);
    }
  };

  public getGuestData = async (req: Request, res: Response) => {
    try {
      canAccess(req, res, [ROLE.GUEST]);
      const data = await this.otherService.getGuestData();
      res.status(200).json(data);
    } catch (error) {
      handleError(res, error);
    }
  };

  public assignRole = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const data = await this.otherService.assignRole(body);
      res.status(200).json(data);
    } catch (error) {
      handleError(res, error);
    }
  };
}

export default OtherController;
