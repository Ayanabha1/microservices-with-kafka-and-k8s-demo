import User, { IUser } from "../models/user-model";
import { IUserRepository } from "../interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = User.findOne({ email });
      return user;
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Repository")
    }
  }
  
}

export default new UserRepository();
