import { DatabaseManager } from "@configs/database";
import { ISignIn, ISignUp } from "@routes/validators";
import { generateUserLoginJwtToken } from "@utils/jwt";
import { logger } from "@utils/logger";
import bcrypt from "bcrypt";

class AuthService {
  public async signUp(body: ISignUp) {
    const { email, password, role } = body;
    const dbManager = DatabaseManager.getInstance();

    try {
      const user: any = await dbManager.get(
        `SELECT id FROM users WHERE email = ?`,
        [email]
      );

      if (user) {
        throw new Error("Already Registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await dbManager.run(
        `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
        [email, hashedPassword, role]
      );

      logger.info(`User with email ${email} successfully registered.`);
      return { message: "User registered successfully.", status: true };
    } catch (error) {
      logger.error("Error during user signup:", error);
      throw new Error(`Signup failed: ${error}`);
    }
  }

  public async signIn(body: ISignIn, res: Response | any) {
    const { email, password } = body;
    const dbManager = DatabaseManager.getInstance();

    try {
      const user: any = await dbManager.get(
        `SELECT id, email, password, role FROM users WHERE email = ?`,
        [email]
      );

      if (!user) {
        throw new Error("Invalid email or password.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      console.log(jwtPayload);

      const { accessToken, refreshToken } =
        generateUserLoginJwtToken(jwtPayload);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      return {
        status: true,
        message: "Login successful",
        accessToken,
        data: {
          role: user.role,
          email: user.email,
        },
      };
    } catch (error) {
      logger.error("Error during user sign-in:", error);
      throw new Error(
        "Sign-in failed. Please check your credentials and try again."
      );
    }
  }
}

export default AuthService;
