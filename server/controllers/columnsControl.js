const mongoose = require("mongoose");
const models = require("../models/model");
const Column = models.Column;

const listColumns = async (req, res) => {
  try {
    const columns = await Column.find();
    res.json(columns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getColumn = async (req, res) => {
  try {
    const column = await Column.findById(req.params.id);
    res.json(column);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createColumn = async (req, res) => {
  const column = new Column({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const savedColumn = await column.save();
    res.status(201).json(savedColumn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateColumn = async (req, res) => {
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
};

const deleteColumn = async (req, res) => {
  try {
    const removedColumn = await Column.findByIdAndRemove(req.params.id);

    if (!removedColumn) {
      return res.status(404).json({ message: "Column not found" });
    }

    res.json(removedColumn);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listColumns,
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn,
};
