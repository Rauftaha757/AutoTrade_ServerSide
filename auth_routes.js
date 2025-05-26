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
const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: {
    msg: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let exsistuser = await UserModel.findOne({ email: email });
    const hashedpassword = await bcrypt.hash(password, 8); // fixed typo 'bcrypy' and added 'await'

    if (!exsistuser) {
      let user = new UserModel({
        name: name,
        email: email,
        password: hashedpassword,
      });
      await user.save();
      res.json(user);
      res.send({
        msg: "successfully inserted",
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

authRouter.post("/api/signin", signinLimiter, async function (req, res) {
  const { name, email, password } = req.body;
  const exsistuser = await UserModel.findOne({ email });
  try {
    if (!exsistuser) {
      res.json({
        msg: "This User dont exsist",
      });
    } else {
      const dbpass = await exsistuser.password;
      const pass_match = await bcrypt.compare(password, dbpass);
  const token = jwt.sign(
      { id: exsistuser._id}, // Payload
      "your_jwt_secret_key", // Secret key (keep this in .env)
      { expiresIn: "1d" } // Token expires in 1 day
    );
      if (pass_match) {

        res.json({
          msg: "successfully logged in",
          status: 200,
          token,
          exsistuser,
        });
      } else {
        res.json({
          msg: "wrong credentials",
        });
      }
    }
  } catch (err) {
    error: err.message;
  }
});

module.exports = authRouter;
