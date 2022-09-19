const userServices = require("../../services/userServices");
const User = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../../models/userSchema");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("user services", () => {
  describe("register service", () => {
    it("should create a new user", async () => {
      User.create.mockResolvedValue({
        email: "email",
        password: "password",
      });

      const result = await userServices.registerUser({
        email: "email",
        password: "password",
      });

      expect(result).toEqual({ email: "email", password: "password" });
    });
  });

  describe("login service SUCCESS", () => {
    it("should create token and login user", async () => {
      User.findOne.mockResolvedValue({
        _doc: {
          email: "email",
          password: "password",
        },
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token");

      const result = await userServices.loginUser("email", "password");

      expect(result).toEqual({
        email: "email",
        password: "password",
        token: "token",
      });
    });
  });

  describe("login service ERROR", () => {
    it("should throw error if user does not exist", async () => {
      User.findOne.mockResolvedValue(null);

      try {
        await userServices.loginUser("email", "password");
      } catch (error) {
        expect(error).toMatchObject({
          name: "Authentication Error",
          message: "User does not exist",
        });
      }
    });
  });

  describe("login service ERROR", () => {
    it("should throw error if passwords do not match", async () => {
      User.findOne.mockResolvedValue({ email: "email", password: "password" });
      bcrypt.compare.mockResolvedValue(false);

      try {
        await userServices.loginUser("email", "password");
      } catch (error) {
        expect(error).toMatchObject({
          name: "Authentication Error",
          message: "Incorrect email or password",
        });
      }
    });
  });

  describe("upload image service", () => {
    it("should update user profile image", async () => {
      User.findByIdAndUpdate.mockResolvedValue({
        email: "email",
        password: "password",
        profileImage: "image",
      });

      const result = await userServices.uploadImage("userId", {
        path: "image",
      });

      expect(result).toEqual({
        email: "email",
        password: "password",
        profileImage: "image",
      });
    });
  });
});
