import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../models/user-model";
import userRepository from "../repositories/user-repository";

class AuthService {
  private userRepository:IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Service")
    }
  }
}

export default new AuthService(userRepository);
