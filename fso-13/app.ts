require("dotenv").config();
import express from "express";
import blogsRouter from "./routers/blogs";
import config from "./config";
import usersRouter from "./routers/users";
const { PORT } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
