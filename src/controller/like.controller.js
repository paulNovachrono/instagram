const likeModel = require("../model/like.model");
const postModel = require("../model/post.model");

const likePostController = async (req, res) => {
  try {
    const loggedInUserName = req.user.userName;
    const postId = req.params.postid;

    const postExists = await postModel.findById(postId);

    if (!postExists)
      return res.status(404).json({ message: "Post does not exists" });

    const alreadyLiked = await likeModel.findOne({
      post: postId,
      userName: loggedInUserName,
    });

    if (alreadyLiked)
      return res.status(409).json({ message: "You Already liked the post" });

    const likePost = await likeModel.create({
      post: postId,
      userName: loggedInUserName,
    });

    res
      .status(201)
      .json({ message: "You Liked the Post Successfully", likePost });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Failed to like post" });
  }
};

const dislikePostController = async (req, res) => {
  try {
    const postId = req.params.postid;
    const loggedInUser = req.user.userName;

    const validPost = await postModel.findById(postId);

    if (!validPost) return res.status(404).json({ message: "Post not found" });

    const dislikePost = await likeModel.findOneAndDelete({
      post: postId,
      userName: loggedInUser,
    });

    if (!dislikePost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post dislike successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Failed to disliked post" });
  }
};

module.exports = { likePostController, dislikePostController };
