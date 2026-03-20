const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      ref: "insta-posts",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Post id required"],
    },
    userName: {
      type: String,
      require: [true, "UserName Required"],
    },
  },
  { timestamps: true },
);

likeSchema.index({ post: 1, userName: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
