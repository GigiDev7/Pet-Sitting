const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.use("/user", userRouter);

app.use(errorHandler);

module.exports = app;
