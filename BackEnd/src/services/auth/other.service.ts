import { DatabaseManager } from "@configs/database";
import { IAssignRole } from "@routes/validators";

class OtherService {
  public async public() {
    return { message: "can accessible to anyone" };
  }

  public async getUserData() {
    return { message: "can accessible for user and admin roles only" };
  }

  public async getAdminData() {
    return { message: "can accessible for admins only" };
  }

  public async getGuestData() {
    return { message: "can accessible for guests only" };
  }

  public async assignRole(body: IAssignRole) {
    const { email, role } = body;
    const dbManager = DatabaseManager.getInstance();

    const user: any = await dbManager.get(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (!user) {
      throw new Error("User Not Found!");
    }

    const updateResult = await dbManager.run(
      `UPDATE users SET role = ? WHERE email = ?`,
      [role, email]
    );

    if (updateResult.changes === 0) {
      throw new Error("No rows updated. Check if the email exists.");
    }

    const updatedData = await dbManager.get(
      `SELECT email, role FROM users WHERE email = ?`,
      [email]
    );

    return { status: true, data: updatedData };
  }
}

export default OtherService;
