import jwt from "jsonwebtoken";
import auth from "./auth.js";

const secret = "test";

describe("auth middleware", () => {
  it("should add userId to req object if token is valid", () => {
    const mockUserId = "123456789";
    const mockToken = jwt.sign({ id: mockUserId }, secret);
    const mockReq = { headers: { authorization: `Bearer ${mockToken}` } };
    const mockRes = {};
    const mockNext = jest.fn();

    auth(mockReq, mockRes, mockNext);

    expect(mockReq.userId).toBe(mockUserId);
    expect(mockNext).toHaveBeenCalled();
  });

  it("should not add userId to req object if token is invalid", () => {
    const mockToken = "invalidToken";
    const mockReq = { headers: { authorization: `Bearer ${mockToken}` } };
    const mockRes = {};
    const mockNext = jest.fn();

    auth(mockReq, mockRes, mockNext);

    expect(mockReq.userId).toBeUndefined();
    expect(mockNext).toHaveBeenCalled();
  });

  it("should not add userId to req object if no token is provided", () => {
    const mockReq = { headers: {} };
    const mockRes = {};
    const mockNext = jest.fn();

    auth(mockReq, mockRes, mockNext);

    expect(mockReq.userId).toBeUndefined();
    expect(mockNext).toHaveBeenCalled();
  });
});