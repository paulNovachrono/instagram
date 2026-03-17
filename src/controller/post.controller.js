const dotenv = require("dotenv").config();

const { ImageKit, toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const createPostController = async (req, res) => {
  console.log(req.body, req.file);

  //   upload the file in the imagekit
  //   const file = await imageKit.files.upload({
  //     file: await toFile(Buffer.from("buffer"), "file"),
  //     fileName: req.file.originalname,
  //   });

  //   res.send(file);

  try {
    const uploadedFile = await imageKit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname), // ✅ FIX
      fileName: req.file.originalname,
    });

    res.send(uploadedFile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Upload failed");
  }
};

module.exports = { createPostController };
