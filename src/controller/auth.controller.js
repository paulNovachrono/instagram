const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { userName, name, email, bio, profileImage, password } = req.body;

  //   Checking if the user already exists by username or email
  const userExists = await userModel.findOne({
    $or: [{ email }, { userName }],
  });

  if (userExists)
    return res.status(400).json({
      message:
        "User Already Exists" +
        (userExists.email == email
          ? "Email Already Exists"
          : "username Already Exists"),
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const registeredUser = await userModel.create({
      userName,
      name,
      email,
      bio,
      profileImage,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: registeredUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        email: registeredUser.email,
        userNamer: registeredUser.userName,
        name: registeredUser.name,
        bio: registeredUser.bio,
        profileImage: registeredUser.profileImage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginController = async (req, res) => {
  const { userName, email, password } = req.body;

  //   note: from the frontend only one value will be coming, {username || email}, based on that we will be finding user using `$or[]`
  const isUserExists = await userModel.findOne({
    $or: [{ userName: userName }, { email: email }],
  });

  if (!isUserExists) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const passwordMatched = await bcrypt.compare(password, isUserExists.password);

  if (!passwordMatched) {
    res.status(409).json({ message: "Invalid Password" });
    return;
  }

  const token = jwt.sign({ id: isUserExists._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User LoggedIn Successfully",
    user: {
      email: isUserExists.email,
      userNamer: isUserExists.userName,
      name: isUserExists.name,
      bio: isUserExists.bio,
      profileImage: isUserExists.profileImage,
    },
  });
};

module.exports = { registerController, loginController };
