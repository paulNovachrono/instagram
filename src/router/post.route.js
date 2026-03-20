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
const { likePostController, dislikePostController } = require("../controller/like.controller.js");
/* 
@route POST api/posts/
@description: Crete Post
-in the middlewhere [upload.single('from-input-name')] should be there
*/
postRouter.post(
  "/",
  identifyUser,
  upload.single("imgUrl"),
  createPostController,
);

/* 
@route GET api/post/userallposts
@description - to get all post info about a specifi user
*/
postRouter.get("/userallposts", identifyUser, getVerifiedUserPostController);

/* 
@route GET api/posts/details/:id
@description - Only the verified user will get their specific post detailsW
*/
postRouter.get(
  "/details/:id",
  identifyUser,
  getSpecificPostDetailsProtectedController,
);

/* 
@route POST api/posts/like/:postid
@description - user can like post [if loggedin]
*/
postRouter.post("/like/:postid", identifyUser, likePostController);

/* 
@route POST api/posts/dislike/:postid
@description - user can dislike post [if liked and loggedin]
*/
postRouter.post("/dislike/:postid", identifyUser, dislikePostController);

module.exports = postRouter;
