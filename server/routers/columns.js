const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../models/model");
const Column = models.Column

// Get all columns
router.get("/", async (req, res) => {
  try {
    const columns = await Column.find();
    res.json(columns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single column
router.get("/:id", async (req, res) => {
  try {
    const column = await Column.findById(req.params.id);
    res.json(column);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new column
router.post("/", async (req, res) => {
  const column = new Column({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const savedColumn = await column.save();
    res.status(201).json(savedColumn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a column by its ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedColumn = await Column.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );

    if (!updatedColumn) {
      return res.status(404).json({ message: "Column not found" });
    }

    res.json(updatedColumn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a column by its ID
router.delete("/:id", async (req, res) => {
  try {
    const removedColumn = await Column.findByIdAndRemove(req.params.id);

    if (!removedColumn) {
      return res.status(404).json({ message: "Column not found" });
    }

    res.json(removedColumn);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
