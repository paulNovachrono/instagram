const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const identifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("Unauthorised access");

  let verifyUser;

  try {
    verifyUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Unauthorised Request" });
  }

  const verifyUserDetails = await userModel.findById(verifyUser.id);

  if (!verifyUserDetails) {
    return res.status(404).json({ message: "User not found" });
  }

  req.user = verifyUserDetails;

  
  
  next();
};

module.exports = identifyUser;
