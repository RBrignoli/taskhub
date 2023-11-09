const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../models/model");
const User = models.User

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user by its ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
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
});

// Delete a user by its ID
router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.findByIdAndRemove(req.params.id);

    if (!removedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(removedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
