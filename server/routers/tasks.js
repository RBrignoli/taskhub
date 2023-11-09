const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../models/model");
const Task = models.Task;

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  const task = new Task(req.body);

  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task by its ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task by its ID
router.delete("/:id", async (req, res) => {
  try {
    const removedTask = await Task.findByIdAndRemove(req.params.id);

    if (!removedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(removedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
