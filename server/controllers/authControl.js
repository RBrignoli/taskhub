const mongoose = require("mongoose");
const models = require("../models/model");
const User = models.User;
const bycryptjs = require("bcryptjs"); 

const signup = async (req, res) => {
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

module.exports = {
  signup,
};
