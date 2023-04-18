import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import ProjectMessage from "./projectMessage.js";

const request = supertest(app);

describe("projectMessage model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await ProjectMessage.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await ProjectMessage.deleteMany({});
  });

  it("should correctly insert a project message into the database", async () => {
    const projectMessage = new ProjectMessage({
      projectName: "test project",
      description: "test project description",
      creator: "test user",
      tags: ["test", "project"],
      selectedFile: "testfile.jpg",
      hw1Count: 1,
      hw2Count: 2,
    });
    const savedProjectMessage = await projectMessage.save();

    expect(savedProjectMessage.projectName).toBe("test project");
    expect(savedProjectMessage.description).toBe("test project description");
    expect(savedProjectMessage.creator).toBe("test user");
    expect(savedProjectMessage.tags).toEqual(["test", "project"]);
    expect(savedProjectMessage.selectedFile).toBe("testfile.jpg");
    expect(savedProjectMessage.hw1Count).toBe(1);
    expect(savedProjectMessage.hw2Count).toBe(2);
  });
});