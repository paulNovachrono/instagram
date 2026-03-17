const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { ImageKit, toFile } = require("@imagekit/nodejs");
const postModel = require("../model/post.model");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const createPostController = async (req, res) => {
  //console.log(req.body, req.file);

  //   upload the file in the imagekit
  //   const file = await imageKit.files.upload({
  //     file: await toFile(Buffer.from("buffer"), "file"),
  //     fileName: req.file.originalname,
  //   });

  //   res.send(file);

  //   try {
  //     const uploadedFile = await imageKit.files.upload({
  //       file: await toFile(req.file.buffer, req.file.originalname), // ✅ FIX
  //       fileName: req.file.originalname,
  //     });

  //     res.send(uploadedFile);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send("Upload failed");
  //   }

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let verifyUser;
    try {
      verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthrozed Authentication" });
    }

    const uploadedFile = await imageKit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: "insta-clone",
    });

    const post = await postModel.create({
      caption: req.body.caption,
      imgUrl: uploadedFile.url,
      user: verifyUser.id,
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

module.exports = { createPostController };
