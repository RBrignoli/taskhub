const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../models/model");
const Project = models.Project;

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("columns");
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new project
router.post("/", async (req, res) => {
  const project = new Project(req.body);

  try {
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a project by its ID
router.post("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a project by its ID
router.delete("/:id", async (req, res) => {
  try {
    const removedProject = await Project.findByIdAndRemove(req.params.id);

    if (!removedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(removedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
