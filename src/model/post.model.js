const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "Image link required"],
  },
  user: {
    ref: "insta-users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "user id required"],
  },
});

const postModel = mongoose.model("insta-posts", postSchema);
