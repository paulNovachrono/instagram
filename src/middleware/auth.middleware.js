const jwt = require("jsonwebtoken");
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

  req.user = verifyUser;

  next();
};

module.exports = identifyUser;
