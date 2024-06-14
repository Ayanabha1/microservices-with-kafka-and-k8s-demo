import { IUserRepository } from "../interfaces/IUserRepository";
import KafkaProducer from "../kafka/KafkaProducer";
import { IUser } from "../models/user-model";
import userRepository from "../repositories/user-repository";

class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async becomeCreator(email: string): Promise<Boolean | void> {
    try {
      const user = await this.userRepository.findByEmail(email);
      await KafkaProducer.sendMessage(
        "user-creator-topic",
        JSON.stringify(user)
      );
      return true;
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Service");
    }
  }

  async emitToNewTopic(email: string): Promise<Boolean | void> {
    try {
      const user = await this.userRepository.findByEmail(email);
      await KafkaProducer.sendMessage(
        "new-topic",
        JSON.stringify(user)
      );
      return true;
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Service");
    }
  }
}

export default new UserService(userRepository);
