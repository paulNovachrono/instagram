const express = require("express");
const authRouter = require("./router/auth.route");
const cookieParser = require("cookie-parser");
const postRouter = require("./router/post.route");
const dotenv = require("dotenv");
const userRouter = require("./router/user.route");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/posts", postRouter);

app.use("/api/users", userRouter)

module.exports = app;
