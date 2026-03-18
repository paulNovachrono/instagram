const dotenv = require("dotenv");
dotenv.config();

const { ImageKit, toFile } = require("@imagekit/nodejs");
const postModel = require("../model/post.model");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const createPostController = async (req, res) => {
  try {
    const verifiedUser = req.user; // from middlewhere

    const uploadedFile = await imageKit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: "insta-clone",
    });

    const post = await postModel.create({
      caption: req.body.caption,
      imgUrl: uploadedFile.url,
      user: verifiedUser.id,
    });

    res.status(201).json({ message: "Post Created Successfully", post });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getVerifiedUserPostController = async (req, res) => {
  try {
    const verifiedUser = req.user; // from middlewhere

    const verifiedUserId = verifiedUser.id;

    try {
      const posts = await postModel.find({ user: verifiedUserId });

      res.status(200).json({ message: "Post Fetched Successfully", posts });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Failed to fetching posts" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getSpecificPostDetailsProtectedController = async (req, res) => {
  try {
    let verifiedUser = req.user; // from middlewhere

    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if (!post) return res.status(404).json({ message: "Post Not Found" });

    const matchedUserIdWithPost = post.user.toString() === verifiedUser.id;

    if (!matchedUserIdWithPost)
      return res.status(403).json({ message: "Forbidden! You're not allowed" });

    return res
      .status(200)
      .json({ message: "Post details Fetched Successfully", post });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createPostController,
  getVerifiedUserPostController,
  getSpecificPostDetailsProtectedController,
};
