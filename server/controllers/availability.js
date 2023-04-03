import mongoose from "mongoose";
import AvailabilityModel from "../models/availability.js";

export const getAvailability = async (req, res) => {
  try {
    const data = await AvailabilityModel.find();
    res.status(200).json(data);
    // const newAvail = new AvailabilityModel({ hwset: "hw2", availability: 200 });
    // await newAvail.save();
    // res.status(201).json(newAvail);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const setAvailability = async (req, res) => {
  const data = req.body;
  try {
    // console.log(data);
    await AvailabilityModel.findByIdAndUpdate(data[0]._id, data[0], {
      new: true,
    });
    await AvailabilityModel.findByIdAndUpdate(data[1]._id, data[1], {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
