require("dotenv").config();
import express, { Request } from "express";
import blogsRouter from "./routers/blogs";
import config from "./config";
import usersRouter from "./routers/users";
import { Authored } from "./types";
import Blogs from "./model/blogs";
const { PORT, sequelize } = config;

const app = express();

app.get("/api/authors", async (_req: Request<never, Authored[]>, res) => {
  // "SELECT author, SUM(likes) AS total_likes, COUNT(author) FROM blogs GROUP BY author"
  const list = await Blogs.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "total_blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "total_likes"],
    ],
    group: "author",
  });

  res.json(list.map((cv) => cv.toJSON()));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
