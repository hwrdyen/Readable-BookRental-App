import express, { Request, Response } from "express";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  return res.status(200).send("Express Home");
});

app.listen(7000, () => {
  console.log(`server is running on localhost:7000`);
});
