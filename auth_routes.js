const express = require("express");
const ms = require("ms");
const authRouter = express.Router();
const UserModel = require("./usermodel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { error } = require("console");
const rateLimit = require("express-rate-limit");
const { json } = require("body-parser");
// const signinLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 2,
//   message: {
//     msg: "Too many login attempts. Please try again after 15 minutes.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exsistuser = await UserModel.findOne({ email });

    if (exsistuser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 8);
    const user = new UserModel({
      name,
      email,
      password: hashedpassword,
    });

    await user.save();

    res.status(201).json({
      error: false,
      user,
      message: "Successfully registered",
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
      details: error.message,
    });
  }
});


authRouter.post("/api/signin", async function (req, res) {
  const { email, password } = req.body;
  try {
    const exsistuser = await UserModel.findOne({ email });

    if (!exsistuser) {
      return res.status(400).json({
        error: true,
        message: "This user does not exist",
      });
    }

    const dbpass = exsistuser.password;
    const pass_match = await bcrypt.compare(password, dbpass);

    if (pass_match) {
      const token = jwt.sign(
        { id: exsistuser._id },
        "your_jwt_secret_key",
        { expiresIn: "1d" }
      );
      return res.json({
  error: false,
  message: "Successfully logged in",
  email: exsistuser.email,
  name: exsistuser.name,
  password: exsistuser.password,
  id: exsistuser._id,
  token:token,
});

    } else {
      return res.status(401).json({
        error: true,
        message: "Wrong credentials",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message || "Server error",
    });
  }
});

module.exports = authRouter;
