import express, { Request, Response } from "express";
import { IUser } from "../models/user-model";
import userService from "../services/user-service";

class UserController {
  async becomeCreator(req: Request, res: Response): Promise<void> {
    try {
      const { emailId } = req.params;
      userService.becomeCreator(emailId);
      res.status(200).json({ message: "Event emitted to become creator" });
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Controller");
    }
  }
  async becomeCreator2(req: Request, res: Response): Promise<void> {
    try {
      const { emailId } = req.params;
      userService.emitToNewTopic(emailId);
      res.status(200).json({ message: "Event emitted to become creator" });
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Controller");
    }
  }
}

export default new UserController();
