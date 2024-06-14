import Creator, { ICreator } from "../models/creator-model";
import { ICreatorRepository } from "../interfaces/ICreatorRepository";

class CreatorRepository implements ICreatorRepository {
  async findByEmail(email: string): Promise<ICreator | null> {
    try {
      const user = Creator.findOne({ email });
      return user;
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Repository");
    }
  }
  async addCreator(user: string): Promise<void> {
    try {
      const parsedUser = JSON.parse(user);
      const { email, name } = parsedUser;
      const creator = await Creator.findOne({ email: email });
      if (creator) {
        console.log("Creator account already exists for user",user);
        return; 
      }
      const newCreator = new Creator({
        email: email,
        name: name,
        isCreator: true,
      });
      await newCreator.save();
      console.log("User:", user, "added as creator successfully");
    } catch (error) {
      console.error("[CREATOR ERROR] Add Creator Repository:", error);
      throw new Error("[CREATOR ERROR] Add Creator Repository");
    }
  }
}

export default new CreatorRepository();
