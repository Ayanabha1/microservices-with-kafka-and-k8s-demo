import express, { Request, Response } from "express";
import { IUser } from "../models/user-model";
import authService from "../services/auth-service";

class AuthController {
  async findUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { emailId } = req.params;
      const user = await authService.findUserByEmail(emailId);
      res.status(200).json({ user: user });
    } catch (error) {
      console.error("[AUTH ERROR] Find User By Email:", error);
      throw new Error("[AUTH ERROR] Find User By Email Controller")
    }
  }
}

export default new AuthController();
