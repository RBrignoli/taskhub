const mongoose = require("mongoose");
const models = require("../models/model");
const Task = models.Task;

const listTasks = async (req, res) => {
  try {
    // const tasks = await Task.find();
    const queryParams = req.query;
    const project_id = queryParams.project ? queryParams.project : null;
    const users_ids = queryParams.users ? queryParams.users.split(",") : [];
    const query = {};
    if (project_id) {
      query.project = project_id;
    }
    if (users_ids.length > 0) {
      query.user = { $in: users_ids };
    }
    if (!project_id) {
      res.status(200).json([]);
    } else {
      const tasks = await Task.find(query);
      const tasksWithUserInfo = await Promise.all(
        tasks.map(async (task) => {
          const user = await models.User.findById(task.user);
          return {
            ...task.toObject(),
            user: { id: user._id, name: user.name },
          };
        })
      );

      res.json(tasksWithUserInfo);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  const task = new Task(req.body);

  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const removedTask = await Task.findByIdAndRemove(req.params.id);

    if (!removedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(removedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
