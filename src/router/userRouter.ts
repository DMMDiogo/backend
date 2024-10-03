import { Router } from "express";
import UserHandler from "../handlers/userHandler.js";
import { check } from "express-validator";
import { checkRole } from "../middlewares/authMiddleware.js";

const router: Router = Router();

router.get("/users", checkRole(["ADMIN", "USER"]), UserHandler.retrieveAll);

router.get("/users/:id", UserHandler.retrieveOne);

// Register a new user
router.post(
  "/users/register",
  [
    check("name").notEmpty().withMessage("User name is required."),
    check("email").isEmail().withMessage("Invalid email format"),
    check("password")
      .isStrongPassword()
      .withMessage(
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols."
      ),
    check("role").isIn(["USER", "ADMIN", "GUEST"]).withMessage("Invalid role"),
  ],
  UserHandler.createUser
);

// Login user
router.post(
  "/users/login",
  [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  UserHandler.authenticate
);

// Update an existing user
router.put("/users/:id", checkRole(["ADMIN", "USER"]), UserHandler.modifyUser);

// Delete an existing user
router.delete("/users/:id", checkRole(["ADMIN"]), UserHandler.removeUser);

export default router;
