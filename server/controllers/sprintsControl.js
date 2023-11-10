const mongoose = require("mongoose");
const models = require("../models/model");
const Sprint = models.Sprint;

const listSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find();
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    res.json(sprint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSprint = async (req, res) => {
  const sprint = new Sprint(req.body);

  try {
    const savedSprint = await sprint.save();
    res.status(201).json(savedSprint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSprint = async (req, res) => {
  try {
    const updatedSprint = await Sprint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSprint) {
      return res.status(404).json({ message: "Sprint not found" });
    }

    res.json(updatedSprint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSprint = async (req, res) => {
  try {
    const removedSprint = await Sprint.findByIdAndRemove(req.params.id);

    if (!removedSprint) {
      return res.status(404).json({ message: "Sprint not found" });
    }

    res.json(removedSprint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listSprints,
  getSprint,
  createSprint,
  updateSprint,
  deleteSprint,
};
