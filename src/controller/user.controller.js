const followerModel = require("../model/follow.model");
const userModel = require("../model/user.model");

const followDetailsController = async (req, res) => {
  try {
    const loggedInUser = req.user.userName;
    const followUserName = req.params.username;

    if (loggedInUser === followUserName) {
      res.status(403).json({ message: "You can not Follow Yourself" });
      return;
    }

    // check if the userName exists that comes in params

    const validUser = await userModel.findOne({ userName: followUserName });

    if (!validUser) {
      return res.status(404).json({ message: "user does not exists" });
    }

    // check if already followed
    const userAlreadyFollow = await followerModel.findOne({
      followers: loggedInUser,
      followee: followUserName,
    });

    if (userAlreadyFollow) {
      res.status(400).json({ message: `You already follow ${followUserName}` });
      return;
    }

    const followRecord = await followerModel.create({
      followers: loggedInUser,
      followee: followUserName,
    });

    res.status(200).json({
      message: `${loggedInUser} successfully followed ${followUserName}`,
      followRecord,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { followDetailsController };
