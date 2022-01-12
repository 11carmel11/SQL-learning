require("dotenv").config();
import express, { Request } from "express";
import Blogs from "./model/blogs";
import { Blog } from "./types";

const app = express();

app.use(express.json());

app.get("/api/blogs", async (_req: Request<never, Blog[] | []>, res) => {
  const blogs = (await Blogs.findAll()).map((blog) => blog.toJSON());
  res.json(blogs);
});

app.post("/api/blogs", async (req: Request<never, Blog | void, Blog>, res) => {
  const dataFromClient: Blog = req.body;
  const newBlog: Blog = (await Blogs.create(dataFromClient)).toJSON();
  res.json(newBlog);
});

app.get(
  "/api/blogs/:id",
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
