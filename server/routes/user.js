import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import { signin, signup, join, leave } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/join", auth, join);
router.post("/leave", auth, leave);


export default router;
