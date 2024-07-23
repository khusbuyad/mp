import express from "express";
import User from "./user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import isValidUser from "../middleware/auth.middleware.js";
dotenv.config();
const router = express.Router();

//register user
router.post("/register/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    await newUser.save();
    return res
      .status(200)
      .send({ message: "User registered successfully", data: newUser });
  } catch (err) {
    console.log("Error in register user");
    console.error(err);
    return res.status(400).send({ message: "Error in register user" });
  }
});
//login  user
router.post("/login/", async (req, res) => {
  const user = req.body;
  const findUser = await User.findOne({ email: user.email });
  if (!findUser) {
    return res.status(400).send({ message: "No user found" });
  }
  const isValidPassword = await bcrypt.compare(
    user.password,
    findUser.password
  );
  if (!isValidPassword) {
    return res.status(401).send({ message: "Password incorrect" });
  }
  const payload = user.email;
  const token = jwt.sign(payload, process.env.secretkey);
  findUser.password = undefined;
  return res
    .status(200)
    .send({ message: "login successfull..", token, findUser });
});
//get logged in user
router.get("/", isValidUser, async (req, res) => {
  const user = req.user;
  const findUser = await User.findOne({ email: user.email });
  findUser.password = undefined;
  return res.status(200).send(findUser);
});
//get all user data
router.get("/list", isValidUser, async (req, res) => {
  const findUser = await User.find();
  return res.status(200).send(findUser);
});

export default router;
