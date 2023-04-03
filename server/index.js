import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import projectRoutes from "./routes/projects.js";
import userRoutes from "./routes/user.js";
import availabilityRoutes from "./routes/availability.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/projects", projectRoutes);
app.use("/user", userRoutes);
app.use("/availability", availabilityRoutes);

const CONNECT_URL =
  "mongodb+srv://xiaoying:jizhideXXY12@cluster0.ssgkqgb.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
