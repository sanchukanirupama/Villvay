import { object, string, TypeOf, z } from "zod";

const RoleEnum = z.enum(["ADMIN", "USER", "GUEST"]);

export const signUpSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
    password: string({
      required_error: "Password is required",
    }),
    role: RoleEnum,
  }),
});

export const signInSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export const assignRoleSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
    role: RoleEnum,
  }),
});

export type ISignUp = TypeOf<typeof signUpSchema>['body'];
export type ISignIn = TypeOf<typeof signInSchema>['body'];
export type IAssignRole = TypeOf<typeof assignRoleSchema>['body'];



