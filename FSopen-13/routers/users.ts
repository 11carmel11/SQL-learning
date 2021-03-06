import { Request, Router } from "express";
import validator from "validator";
import jwt from "jsonwebtoken";
import Users from "../model/users";
import { User } from "../types";
import config from "../config";
import Blogs from "../model/blogs";
import ToRead from "../model/toRead";
const { secret } = config;
const router = Router(); // /api/users router

router.get("/", async (_req: Request<never, User[] | []>, res) => {
  const users = await Users.findAll({
    include: {
      model: Blogs,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users.map((user) => user.toJSON()));
});

router.post(
  "/",
  async (
    req: Request<never, User | { error: unknown }, Omit<User, "id">>,
    res
  ) => {
    try {
      const { name, username } = req.body;
      if (!validator.isEmail(username))
        throw "Validation isEmail on username failed";
      const user = (await Users.create({ name, username })).toJSON();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error });
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

router.post(
  "/login",
  async (
    req: Request<never, string, Partial<User> & { password: string }>,
    res
  ) => {
    const { id, name, username, password } = req.body;
    let user = await Users.findByPk(id);
    if (user) {
      user = user.toJSON();
      if (password === "secret") {
        const token = jwt.sign(JSON.stringify(user), secret);
        res.json(token);
      }
    } else res.sendStatus(404);
  }
);

router.get(
  "/list/:userId",
  async (
    req: Request<{ userId: string }, {}[], never, { read?: string }>,
    res
  ) => {
    const { userId } = req.params;
    const { read } = req.query;

    const where: { userId: string; read?: string } = { userId };
    if (read === "true" || read === "false") {
      where.read = read;
    }
    const list = await ToRead.findAll({
      where,
      attributes: { exclude: ["user_id", "blog_id"] },
      include: Blogs,
    });
    res.json(list.map((elm) => elm.toJSON()));
  }
);

export default router;
