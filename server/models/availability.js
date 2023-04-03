import mongoose from "mongoose";

const availabilitySchema = mongoose.Schema({
  hwset: String,
  availability: {
    type: Number,
    default: 0,
  },
});

const AvailabilityModel = mongoose.model(
  "AvailabilityModel",
  availabilitySchema
);

export default AvailabilityModel;
