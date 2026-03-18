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
    res.status(500).json({ message: "Failed To Follow User" });
  }
};

const unFollowDetailsController = async (req, res) => {
  try {
    const loggedInUserName = req.user.userName;
    const unfollowUserName = req.params.username;

    // prevent self-unfollow (optional but clean)
    if (loggedInUserName === unfollowUserName) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    // check if user exists
    const userExists = await userModel.findOne({
      userName: unfollowUserName,
    });

    if (!userExists) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // directly delete 
    const unfollowRecord = await followerModel.findOneAndDelete({
      followers: loggedInUserName,
      followee: unfollowUserName,
    });

    if (!unfollowRecord) {
      return res.status(400).json({ message: "Already unfollowed" });
    }

    res.status(200).json({
      message: `${loggedInUserName} unfollowed ${unfollowUserName} successfully`,
      unfollowRecord,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to unfollow user" });
  }
};

module.exports = { followDetailsController, unFollowDetailsController };
