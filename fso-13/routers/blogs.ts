import { Request, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Op } from "sequelize";
import Blogs from "../model/blogs";
import Users from "../model/users";
import { Blog } from "../types";
import config from "../config";

const { secret } = config;

const router = Router(); // /api/blogs router

router.get(
  "/",
  async (
    req: Request<never, Blog[] | [], unknown, { search?: string }>,
    res
  ) => {
    const where: any = {};

    const { search } = req.query;
    if (search) {
      const opr = { [Op.iLike]: `%${search}%` };

      where["$or"] = [{ title: opr }, { author: opr }];
    }

    const blogs: Blog[] = (
      await Blogs.findAll({
        attributes: { exclude: ["userId"] },
        include: {
          model: Users,
          attributes: ["name"],
        },
        where,
      })
    ).map((blog) => blog.toJSON());

    res.json(blogs);
  }
);

router.post("/", async (req: Request<never, Blog | void, Blog>, res) => {
  const { authorization }: { authorization?: string } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, secret);
      const user = JSON.parse(decoded as string);
      try {
        const dataFromClient: Blog = {
          ...req.body,
          userId: (user as JwtPayload).id,
        };
        const newBlog: Blog = (await Blogs.create(dataFromClient)).toJSON();
        res.json(newBlog);
      } catch (error) {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(498);
    }
  } else {
    res.sendStatus(401);
  }
});

router.get(
  "/:id",
  async (req: Request<{ id: string }, Blog | string, never>, res) => {
    const { id } = req.params;
    const blog = await Blogs.findByPk(Number(id));
    if (blog) {
      res.json(blog.toJSON());
    } else {
      res.sendStatus(404);
    }
  }
);

router.put(
  "/:id",
  async (
    req: Request<{ id: string }, Blog | string, { likes: number | string }>,
    res
  ) => {
    try {
      const { id } = req.params;
      const { likes } = req.body;
      const blog = await Blogs.findByPk(id);
      if (blog) {
        await blog.update({ likes });
        res.json(blog.toJSON());
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(401);
    }
  }
);

router.delete("/:id", async (req: Request<{ id: string }, string>, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, secret);
      const user = JSON.parse(decoded as string);
      const modeledBlog = await Blogs.findByPk(id);
      if (modeledBlog) {
        const blog: Blog = modeledBlog.toJSON();
        if (blog.userId === user.id) {
          await modeledBlog.destroy();
          res.sendStatus(204);
        }
        res.sendStatus(401);
      } else res.sendStatus(404);
    } catch (error) {
      res.sendStatus(498);
    }
  } else res.sendStatus(403);
});

export default router;
