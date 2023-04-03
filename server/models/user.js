import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  inProject: [String], // project _id
});

const UserModel = mongoose.model("UserModels", userSchema);

export default UserModel;
