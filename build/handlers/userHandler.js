import userService from "../services/userService.js";
import { validationResult } from "express-validator";
class UserHandler {
    constructor() {
        this.retrieveAll = async (req, res) => {
            try {
                const allUsers = await userService.getAll();
                res.json(allUsers);
            }
            catch (error) {
                res.status(500).json({ error: "Unable to retrieve users" });
            }
        };
        this.retrieveOne = async (req, res) => {
            try {
                const userId = req.params.id;
                const singleUser = await userService.getUserById(userId);
                if (!singleUser) {
                    res.status(404).json({ error: "User not found" });
                }
                res.json(singleUser);
            }
            catch (error) {
                res.status(500).json({ error: "Unable to retrieve user" });
            }
        };
        this.createUser = async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }
                const newUser = req.body;
                const registeredUser = await userService.register(newUser);
                res.status(201).json(registeredUser);
            }
            catch (error) {
                res.status(500).json({ error: "Unable to register user" });
            }
        };
        this.authenticate = async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }
                const { email, password } = req.body;
                const authenticatedUser = await userService.login(email, password);
                if (authenticatedUser === null) {
                    res.status(404).json({ error: "Invalid email or password" });
                }
                res.json(authenticatedUser);
            }
            catch (error) {
                res.status(500).json({ error: "Login failed" });
            }
        };
        this.modifyUser = async (req, res) => {
            try {
                const userId = req.params.id;
                const userData = req.body;
                const modifiedUser = await userService.update(userId, userData);
                if (!modifiedUser) {
                    res.status(404).json({ error: "User not found" });
                }
                res.json(modifiedUser);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to modify user" });
            }
        };
        this.removeUser = async (req, res) => {
            try {
                const userId = req.params.id;
                const removedUser = await userService.delete(userId);
                if (!removedUser) {
                    res.status(404).json({ error: "User not found" });
                }
                res.json(removedUser);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to remove user" });
            }
        };
    }
}
export default new UserHandler();
