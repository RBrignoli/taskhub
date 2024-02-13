const mongoose = require("mongoose");
const models = require("../models/model");
const User = models.User;
const bycryptjs = require("bcryptjs"); 
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bycryptjs.hashSync(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
  } catch (e) {
    console.log(e);
    if (e.name == "MongoServerError" && e.code === 11000) {
      return res.status(409).send({ message: "Email already exists." });
    } else {
      return res.status(500).send(e);
    }
  }
  return res.status(200).json({ message: "Oskey" });
};

const signin = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      // next(errorHandler(404, 'User not Found.')) TODO check why error is not working
      return res.status(404).json({ message: "User not found." });
    }
    const validPassword = bycryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Email or Password!" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.jwt_secret_key
    );
    return res.status(200).cookie("Token", token, { httpOnly: true }).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
  
};

module.exports = {
  signup,
  signin,
};
