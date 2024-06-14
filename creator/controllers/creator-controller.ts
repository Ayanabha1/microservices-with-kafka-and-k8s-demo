import { Request, Response } from "express";
import { ICreator } from "../models/creator-model";
import creatorService from "../services/creator-service";

class CreatorController {
  async findUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { emailId } = req.params;

      const user = await creatorService.findUserByEmail(emailId);
      res.status(200).json({ user: user });
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Controller")
    }
  }
}

export default new CreatorController();
