const mongoose = require("mongoose");
const models = require("../models/model");
const User = models.User;
const Project = models.Project;

const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    const usersList = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      isAdmin: user.is_admin,
    }));
    res.json(usersList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        is_admin: req.body.is_admin
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.user.admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const projects = await Project.deleteMany({ owner: req.params.id });
    const userId = req.params.id;
    await Project.updateMany(
      {
        $or: [{ members: userId }, { managers: userId }],
      },
      { $pull: { members: userId, managers: userId } }
    );

    const removedUser = await User.findByIdAndRemove(req.params.id);

    res.json(removedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
