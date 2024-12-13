/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Router } from "express";

import { IRoutes } from "@interfaces/routes.interface";
import { validateResource } from "@middlewares/validateResource";
import { signUpSchema, signInSchema, assignRoleSchema } from "./validators";
import { authenticated } from "@middlewares/auth";
import OtherController from "@controllers/other.controller";

class OtherRoutes implements IRoutes {
  public path = "/api";
  public router = Router();
  public otherController = new OtherController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/public`, this.otherController.public);
    this.router.get(
      `${this.path}/user-data`,
      authenticated,
      this.otherController.getUserData
    );
    this.router.get(
      `${this.path}/admin-data`,
      authenticated,
      this.otherController.getAdminData
    );
    this.router.get(
      `${this.path}/guest-data`,
      authenticated,
      this.otherController.getGuestData
    );

    // assign and change the role dynamically
    this.router.post(
      `${this.path}/assign-role`,
      authenticated,
      validateResource(assignRoleSchema),
      this.otherController.assignRole
    );
  }
}

export default OtherRoutes;
