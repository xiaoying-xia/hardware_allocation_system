import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  projectName: String,
  description: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  hw1Count: {
    type: Number,
    default: 0,
  },
  hw2Count: {
    type: Number,
    default: 0,
  },
});

const ProjectMessage = mongoose.model("ProjectMessage", projectSchema);

export default ProjectMessage;
