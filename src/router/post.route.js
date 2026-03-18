const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  createPostController,
  getVerifiedUserPostController,
  getSpecificPostDetailsProtectedController,
} = require("../controller/post.controller");
const identifyUser = require("../middleware/auth.middleware.js");
const postRouter = express.Router();

// in the middlewhere [upload.single('from-input-name')] should be there
postRouter.post(
  "/",
  identifyUser,
  upload.single("imgUrl"),
  createPostController,
);

postRouter.get("/", identifyUser, getVerifiedUserPostController);

// specifi post
postRouter.get(
  "/details/:id",
  identifyUser,
  getSpecificPostDetailsProtectedController,
);

module.exports = postRouter;
