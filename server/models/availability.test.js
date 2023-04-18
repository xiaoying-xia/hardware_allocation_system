import mongoose from "mongoose";
import AvailabilityModel from "./availability.js";

describe("Availability Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  });

  afterEach(async () => {
    await AvailabilityModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create and save a new availability successfully", async () => {
    const mockAvailability = new AvailabilityModel({
      hwset: "HW1",
      availability: 100,
    });
    const savedAvailability = await mockAvailability.save();
    expect(savedAvailability._id).toBeDefined();
    expect(savedAvailability.hwset).toBe(mockAvailability.hwset);
    expect(savedAvailability.availability).toBe(mockAvailability.availability);
  });

  it("should not create a new availability without required fields", async () => {
    const mockAvailability = new AvailabilityModel({
      availability: 100,
    });
    let err;
    try {
      const savedAvailability = await mockAvailability.save();
      error = savedAvailability;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.hwset).toBeDefined();
  });

  it("should update the availability of an existing hwset", async () => {
    const mockAvailability = new AvailabilityModel({
      hwset: "HW1",
      availability: 100,
    });
    await mockAvailability.save();

    const updatedAvailability = await AvailabilityModel.findOneAndUpdate(
      { hwset: "HW1" },
      { availability: 90 },
      { new: true }
    );
    expect(updatedAvailability.availability).toBe(90);
  });
});