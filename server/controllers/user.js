import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const join = async (req, res) => {
  const id = req.body;
  const projectId = Object.keys(id)[0];

  if (!req.userId) res.status(400).json({ message: "Unauthorized Access" });
  try {
    const doc = await UserModel.findById(req.userId);
    if (!doc) res.status(500).json({ message: "Something went wrong" });
    doc.inProject.push(projectId);
    // console.log(doc.inProject);

    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: "Something went wrong" });
  }
};

export const leave = async (req, res) => {
  const id = req.body;
  const projectId = Object.keys(id)[0];

  if (!req.userId) res.status(400).json({ message: "Unauthorized Access" });
  try {
    const doc = await UserModel.findById(req.userId);
    doc.inProject = [...doc.inProject].filter((id) => id !== projectId);
    // console.log(doc.inProject);

    await doc.save();

    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: "Something went wrong" });
  }
};
