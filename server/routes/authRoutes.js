const express = require("express");
const authMiddleware = require("../midddleware/authMiddleware");
const {
  loginUserController,
  registerUserController,
} = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);

module.exports = authRouter;
