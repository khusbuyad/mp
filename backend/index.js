import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import projectController from "./project/project.controller.js";
import userContoller from "./user/user.controller.js";
import commentController from "./comment/comment.controller.js";
import likeController from "./like/like.controller.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/project", projectController);
app.use("/api/user/", userContoller);
app.use("/api/comment/", commentController);
app.use("/api/like/", likeController);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
