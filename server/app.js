const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoutes");
const countryRouter = require("./routes/countryRoutes");
const sitterRouter = require("./routes/sitterRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/UserImages", express.static("UserImages"));

app.use("/user", userRouter);
app.use("/countries", countryRouter);
app.use("/sitter", sitterRouter);

app.use(errorHandler);

module.exports = app;
