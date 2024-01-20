import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";

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

      // create a new jsonwebtoken
      let jwt_token = jwt.sign(
        // first parameter: object (info) you want to include in the token
        { user_id: newUser._id },
        // secret key used to sign the token
        process.env.JWT_SECRET_KEY as string,
        // optional setting (ex. token's expirationDate,...)
        {
          expiresIn: "1d",
        }
      );

      // setting cookie inside the HTTP response
      // send a cookie to the client's browser
      res.cookie("auth_token", jwt_token, {
        // restricts access to the cookie to HTTP requests only
        // prevent client-side scripts accessing the cookie (cross-site scripting attacks)
        httpOnly: true,

        // cookie is only sent over a secure connection (HTTPS) in a production environment --> render.com default NODE_ENV = production
        secure: process.env.NODE_ENV === "production",

        // maximum age of the cookie (in ms)
        maxAge: 1000 * 60 * 60 * 24, // 1d
      });

      return res.status(200).send({ message: "User registered successfully!" });
    } catch (error) {
      console.log("registration error: " + error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
