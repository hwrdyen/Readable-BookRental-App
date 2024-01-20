import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";

const router = express.Router();

// TEST
router.get("/register", async (req, res) => {
  return res.status(200).json({ message: "User Routes!" });
});

// POST /api/users/registration --> Create New User
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const check_results = validationResult(req);
    if (!check_results.isEmpty()) {
      return res.status(400).json({ message: check_results.array() });
    }

    try {
      let duplicate_user = await User.findOne({ email: req.body.email });

      if (duplicate_user) {
        return res.status(400).json({ message: "User already exists!" });
      }

      let newUser = new User(req.body);
      await newUser.save();

      return res.status(200).send({ message: "User registered successfully!" });
    } catch (error) {
      console.log("registration error: " + error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
