import mongoose from "mongoose";
import ProjectMessage from "../models/projectMessage.js";

export const getProjects = async (req, res) => {
  try {
    // console.log("===========");
    // console.log(req.body);
    const projectMessage = await ProjectMessage.find();
    // console.log(projectMessage);
    res.status(200).json(projectMessage);
    // console.log(projectMessage);
    // console.log("===========");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const project = req.body;
  const newProject = new ProjectMessage(project);
  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id: _id } = req.params;
  const project = req.body;
  console.log(req.params)

  // check if it's a valid id
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No projects with the id");
  }

  const updatedProject = await ProjectMessage.findByIdAndUpdate(_id, project, {
    new: true,
  });

  res.status(201).json(updatedProject);
};
