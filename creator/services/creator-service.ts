import { ICreatorRepository } from "../interfaces/ICreatorRepository";
import { ICreator } from "../models/creator-model";
import creatorRepository from "../repositories/creator-repository";

class CreatorService {
  private creatorRepository:ICreatorRepository;

  constructor(creatorRepository: ICreatorRepository) {
    this.creatorRepository = creatorRepository;
  }

  async findUserByEmail(email: string): Promise<ICreator | null> {
    try {
      const user = await this.creatorRepository.findByEmail(email);
      return user;
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Service")
    }
  }

  async addCreator(user: string): Promise<void | null> {
    try {
      await creatorRepository.addCreator(user)
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Service")
    }
  }
}

export default new CreatorService(creatorRepository);
