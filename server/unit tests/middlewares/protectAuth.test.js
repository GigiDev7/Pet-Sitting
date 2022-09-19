const { protectAuth } = require("../../middlewares/protectAuth");
const jwt = require("jsonwebtoken");
const User = require("../../models/userSchema");
const { errorHandler } = require("../../middlewares/errorHandler");

jest.mock("jsonwebtoken");
jest.mock("../../models/userSchema");

const req = {};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

describe("protect auth middleware", () => {
  describe("auth ERROR", () => {
    it("should return authorization error", () => {
      expect(() => protectAuth(req, res)).toThrowError({
        name: "Authorization Error",
        message: "Authorization failed",
      });
    });
  });
});
