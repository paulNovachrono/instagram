const express = require("express");
const {
  followDetailsController,
  unFollowDetailsController,
} = require("../controller/user.controller");
const identifyUser = require("../middleware/auth.middleware");

const userRouter = express.Router();

/* 
@route [POST] /api/user/follow/:username
*/
userRouter.post("/follow/:username", identifyUser, followDetailsController);


/* 
@route [POST] /api/user/unfollow/:username
*/
userRouter.post("/unfollow/:username", identifyUser, unFollowDetailsController);

module.exports = userRouter;
