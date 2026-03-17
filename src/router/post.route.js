const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { createPostController } = require("../controller/post.controller");
const postRouter = express.Router();

// in the middlewhere [upload.single('from-input-name')] should be there

postRouter.post("/", upload.single("imgUrl"), createPostController);

module.exports = postRouter;
