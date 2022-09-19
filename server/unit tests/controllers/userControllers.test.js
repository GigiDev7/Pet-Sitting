const userControllers = require("../../controllers/userControllers");
const userServices = require("../../services/userServices");
const { errorHandler } = require("../../middlewares/errorHandler");

jest.mock("../../services/userServices");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

const req = {
  body: {
    email: "email",
    password: "password",
  },
};

class MockError {
  constructor(name, message) {
    this.name = name;
    this.message = message;
  }
}

describe("user controllers", () => {
  describe("register controller SUCCESS", () => {
    it("should return response with 201 status and new user", async () => {
      userServices.registerUser.mockResolvedValue({
        _doc: { email: "email", password: "password" },
      });

      await userControllers.register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        email: "email",
      });
    });
  });

  describe("register controller ERROR", () => {
    it("should return error response", async () => {
      userServices.registerUser.mockRejectedValue(
        new MockError("mock error", "registration failed")
      );
      const next = jest.fn((err) => errorHandler(err, req, res));

      try {
        await userControllers.register(req, res, next);
      } catch (error) {
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
      }
    });
  });

  describe("login controller SUCCESS", () => {
    it("should return succes response and user", async () => {
      userServices.loginUser.mockResolvedValue({
        email: "email",
        password: "password",
      });

      await userControllers.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: "email",
      });
    });
  });

  describe("login controller ERROR", () => {
    it("should return error response", async () => {
      userServices.loginUser.mockRejectedValue(
        new MockError("Validation Error", "validation error")
      );
      const next = jest.fn((err) => errorHandler(err, req, res));

      try {
        await userControllers.login(req, res, next);
      } catch (error) {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "validation error" });
      }
    });
  });
});
