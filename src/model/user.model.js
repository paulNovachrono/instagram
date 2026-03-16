const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "User name Required"],
  },
  name: {
    type: String,
    required: [true, "Name Required"],
  },
  email: {
    type: String,
    unique: [true, "This email already exists"],
    required: [true, "email Required"],
  },
  password: {
    type: String,
    required: [true, "Password Required"],
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/debajoytiCloude/default_avatar",
  },
});

const userModel = mongoose.model("insta-users", userSchema);

module.exports = userModel;
