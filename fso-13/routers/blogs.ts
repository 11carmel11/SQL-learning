import { Request, Router } from "express";
import Blogs from "../model/blogs";
import { Blog } from "../types";
const router = Router(); // /api/blogs router

router.get("/", async (_req: Request<never, Blog[] | []>, res) => {
  const blogs: Blog[] = (await Blogs.findAll()).map((blog) => blog.toJSON());
  res.json(blogs);
});

router.post("/", async (req: Request<never, Blog | void, Blog>, res) => {
  try {
    const dataFromClient: Blog = req.body;
    const newBlog: Blog = (await Blogs.create(dataFromClient)).toJSON();
    res.json(newBlog);
  } catch (error) {
    res.sendStatus(400);
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

export default router;
