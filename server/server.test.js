const connectDB = require("./utils/connector");
const mongoose = require("mongoose");
const request = require("supertest");
const cookieValidator = require("./middlewares/cookieValidator");
const jwt = require("jsonwebtoken");


describe("connectDB", () => {
  it("should connect to the database", async () => {
    connectDB();
    const connection = mongoose.connection;
    expect(connection.readyState).toBe(1);
    expect(connection.name).toBe("test");
    expect(connection.host).toBe("localhost:27017/test");
    await mongoose.disconnect();
  });
});

const req = {};
const res = {
  status: jest.fn(() => res),
  send: jest.fn(),
  cookie: jest.fn(),
};
describe("when a valid token is provided", () => {
  it("should set the req.user property and call the next function", () => {
    const token = jwt.sign(
      { id: 1, name: "Test User" },
      process.env.jwt_secret_key
    );
    req.cookies = { Token: token };
    cookieValidator(req, res, next);
    expect(req.user).toEqual({ id: 1, name: "Test User" });
    expect(next).toHaveBeenCalled();
  });
});

describe("when no token is provided", () => {
  it("should return a 401 status code and an error message", () => {
    cookieValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Unauthorized: No token provided.");
  });
});

describe("when an invalid token is provided", () => {
  it("should return a 401 status code and an error message", () => {
    const token = jwt.sign({ id: 1, name: "Test User" }, "WRONG_SECRET_KEY");
    req.cookies.Token = token;
    cookieValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Unauthorized: Invalid token.");
  });
});
