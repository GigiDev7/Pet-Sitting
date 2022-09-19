const { protectAuth } = require("../../middlewares/protectAuth");
const jwt = require("jsonwebtoken");
const User = require("../../models/userSchema");
const { errorHandler } = require("../../middlewares/errorHandler");

jest.mock("jsonwebtoken");
jest.mock("../../models/userSchema");

const res = {};
const reqError = {};
const reqSuccess = {
  headers: {
    authorization: "Bearer token",
  },
};

describe("protect auth middleware", () => {
  describe("auth ERROR", () => {
    it("should return authorization error", () => {
      expect(() => protectAuth(reqError, res)).toThrowError({
        name: "Authorization Error",
        message: "Authorization failed",
      });
    });
  });

  describe("auth SUCCESS", () => {
    it("should not throw an error", () => {
      User.findById.mockResolvedValue({
        email: "email",
        password: "password",
      });
      jwt.verify.mockReturnValue({ id: "userId" });
      const next = jest.fn();

      expect(() => protectAuth(reqSuccess, res)).not.toThrow();
    });
  });
});
