const express = require("express");
const { followDetailsController } = require("../controller/user.controller");
const identifyUser = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.post("/follow/:username",identifyUser, followDetailsController)


module.exports = userRouter;
