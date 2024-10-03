import { Request, Response } from "express";
import { IUser } from "../model/userModel.js";
import userService from "../services/userService.js";
import { validationResult } from "express-validator";

class UserHandler {
  retrieveAll = async (req: Request, res: Response) => {
    try {
      const allUsers: IUser[] | undefined = await userService.getAll();
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve users" });
    }
  };

  retrieveOne = async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id;
      const singleUser: IUser | null = await userService.getUserById(userId);

      if (!singleUser) {
        res.status(404).json({ error: "User not found" });
      }

      res.json(singleUser);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve user" });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newUser: IUser = req.body;
      const registeredUser: any = await userService.register(newUser);
      res.status(201).json(registeredUser);
    } catch (error) {
      res.status(500).json({ error: "Unable to register user" });
    }
  };

  authenticate = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const authenticatedUser: any = await userService.login(email, password);

      if (authenticatedUser === null) {
        res.status(404).json({ error: "Invalid email or password" });
      }

      res.json(authenticatedUser);
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  };

  modifyUser = async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id;
      const userData: IUser = req.body;
      const modifiedUser = await userService.update(userId, userData);

      if (!modifiedUser) {
        res.status(404).json({ error: "User not found" });
      }
      res.json(modifiedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to modify user" });
    }
  };

  removeUser = async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id;
      const removedUser = await userService.delete(userId);

      if (!removedUser) {
        res.status(404).json({ error: "User not found" });
      }
      res.json(removedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove user" });
    }
  };
}

export default new UserHandler();
