import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import request from "supertest";

import UserModel from "../models/user.js";
import { signin, signup, join, leave } from "./user.js";

const secret = "test";

// Mock UserModel functions
jest.mock("../models/user.js");

describe("user.js controller", () => {
  describe("signin", () => {
    it("should return 404 if user does not exist", async () => {
      UserModel.findOne.mockResolvedValue(null);

      const req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User doesn't exist",
      });
    });

    it("should return 400 if password is incorrect", async () => {
      UserModel.findOne.mockResolvedValue({
        email: "test@test.com",
        password: "testpassword",
      });

      bcrypt.compare.mockResolvedValue(false);

      const req = {
        body: {
          email: "test@test.com",
          password: "wrongpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });

    it("should return 200 with user and token if credentials are correct", async () => {
      UserModel.findOne.mockResolvedValue({
        email: "test@test.com",
        password: "testpassword",
        _id: "testid",
      });

      bcrypt.compare.mockResolvedValue(true);

      const req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        result: {
          email: "test@test.com",
          password: "testpassword",
          _id: "testid",
        },
        token: expect.any(String),
      });
    });

    it("should return 500 if an error occurs", async () => {
      UserModel.findOne.mockRejectedValue(new Error("Database error"));

      const req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong",
      });
    });
  });

  describe("signup", () => {
    it("should return 400 if user already exists", async () => {
      UserModel.findOne.mockResolvedValue({
        email: "test@test.com",
        password: "testpassword",
      });

      const req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
          firstName: "John",
          lastName: "Doe",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.body.message).toBe("Unauthorized Access");
    });
    it("should return 500 if something went wrong during join", async () => {
        req.userId = "dummyUserId";
        req.body = { projectId: "dummyProjectId" };
    
        UserModel.findById = jest.fn(() => {
        throw new Error();
        });
    
        await join(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.body.message).toBe("Something went wrong");
    });
    
    it("should remove a project id from user's inProject array on leave", async () => {
        req.userId = "dummyUserId";
        req.body = { dummyProjectId: "" };
    
        const user = {
        inProject: ["dummyProjectId"],
        save: jest.fn(),
        };
    
        UserModel.findById = jest.fn(() => user);
    
        await leave(req, res);
    
        expect(user.inProject).not.toContain("dummyProjectId");
        expect(user.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(user);
    });
    
    it("should return 400 if user is not authenticated during leave", async () => {
        req.userId = null;
        req.body = { dummyProjectId: "" };
    
        await leave(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.body.message).toBe("Unauthorized Access");
    });
    
    it("should return 500 if something went wrong during leave", async () => {
        req.userId = "dummyUserId";
        req.body = { projectId: "dummyProjectId" };
    
        UserModel.findById = jest.fn(() => {
        throw new Error();
        });
    
        await leave(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.body.message).toBe("Something went wrong");
        });
    });
});