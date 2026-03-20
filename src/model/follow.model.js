const mongoose = require("mongoose");

// since userName is unique we are storing userName for followSchema

const followSchema = new mongoose.Schema(
  {
    followers: {
      type: String,
      required: [true, "Followers required"],
    },
    followee: {
      type: String,
      required: [true, "Followee required"],
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted"],
      },
    },
  },
  { timestamps: true },
);

// one a person can follow anther person one time
followSchema.index({ followers: 1, followee: 1 }, { unique: true });

const followerModel = mongoose.model("follows", followSchema);

module.exports = followerModel;
