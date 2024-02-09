const mongoose = require("mongoose");
const models = require("../models/model");
const User = models.User;

const signup = async (req, res) => {
  console.log(req.body);
  // try {
  //     let user = new User(req.body);
  //     await user.save();
  //     req.session.user = user;
  //     return res.redirect("/homepage")

  // } catch (e) {
  //     console.log(e);
  //     if (e.name == "MongoError" && e.code === 11000) { // duplicate key error
  //         return res.status(409).send({ message: 'Username already exists.' });
  //     } else {
  //         return res.status(500).send(e);
  //     }
  // }
  return res.status(200).json({ message: "Oskey" });
};

module.exports = {
  signup,
};
