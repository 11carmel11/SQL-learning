import { Request, Router } from "express";
import jwt from "jsonwebtoken";
import Users from "../model/users";
import { User } from "../types";
import config from "../config";
const { secret } = config;
const router = Router(); // /api/users router

router.get("/", async (_req: Request<never, User[] | []>, res) => {
  const users = await Users.findAll();
  res.json(users.map((user) => user.toJSON()));
});

router.post(
  "/",
  async (
    req: Request<never, { user: User; token: string } | string, User>,
    res
  ) => {
    try {
      const user = (await Users.create(req.body)).toJSON();
      const token = jwt.sign(user, secret);
      res.status(201).json({ user, token });
    } catch (error) {
      res.sendStatus(400);
    }
  }
);

router.put(
  "/:username",
  async (
    req: Request<{ username: string }, User | string, { name: string }>,
    res
  ) => {
    const {
      params: { username },
      body: { name },
    } = req;
    const user = await Users.findOne({ where: { username } });
    if (user) {
      await user.update({ name });
      res.json(user.toJSON());
    } else {
      res.sendStatus(404);
    }
  }
);

export default router;
