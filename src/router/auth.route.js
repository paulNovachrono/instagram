const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/auth.controller");

const authRouter = express.Router();

/* 
@route POST api/auth/register
@description - Api for register user
*/
authRouter.post("/register", registerController);
/* 
@route POST api/auth/login
@description - Api for login user
*/
authRouter.post("/login", loginController);

module.exports = authRouter;
