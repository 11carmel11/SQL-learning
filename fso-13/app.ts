require("dotenv").config();
import express from "express";
import blogsRouter from "./routers/blogs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/blogs", blogsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
