const express = require("express");
const {
  followDetailsController,
  unFollowDetailsController,
  acceptFollowController,
  rejectFollowController,
} = require("../controller/user.controller");
const identifyUser = require("../middleware/auth.middleware");

const userRouter = express.Router();

/* 
@route POST /api/user/followrequest/:username
@description - send follow request
*/
userRouter.post(
  "/followrequest/:username",
  identifyUser,
  followDetailsController,
);

/* 
@route POST /api/user/acceptfollow/:username
@description - accept follow request
*/
userRouter.post(
  "/acceptfollow/:username",
  identifyUser,
  acceptFollowController,
);

/* 
@route POST /api/user/rejectfollow/:username
@description - Reject follow request
*/
userRouter.post("/rejectfollow/:username", identifyUser, rejectFollowController)

/* 
@route [POST] /api/user/unfollow/:username
@description - unfollow a user
*/
userRouter.post("/unfollow/:username", identifyUser, unFollowDetailsController);

module.exports = userRouter;
