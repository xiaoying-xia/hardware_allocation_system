import express from "express";
import { getProjects, createProject, updateProject } from "../controllers/projects.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProjects); // get projects from db
router.post("/", auth, createProject); // create projects to db
router.patch("/:id", auth, updateProject) // update current project

export default router;
