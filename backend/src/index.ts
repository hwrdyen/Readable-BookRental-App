import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  return res.status(200).send("Express Home");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(7000, () => {
  console.log(`server is running on localhost:7000`);
});
