import express from "express";
import { getAvailability, setAvailability } from "../controllers/availability.js";


const router = express.Router();

router.get("/", getAvailability);
router.post("/", setAvailability);

export default router;
