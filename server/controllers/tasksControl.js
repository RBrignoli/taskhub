const mongoose = require("mongoose");
const models = require("../models/model");
const Task = models.Task;
const Project = models.Project;

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
  const projectId = req.body.project;
  const requester_id = req.user._id;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (
      project.owner.toString() !== requester_id &&
      !project.managers.includes(requester_id) &&
      !req.user.admin
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {

    const requester_id = req.user._id;
    const task = await Task.findById(req.params.id);
    const project = await Project.findById(task.project);
    if (
      project.owner.toString() !== requester_id &&
      !project.managers.includes(requester_id) &&
      !req.user.admin &&
      task.user !== requester_id
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
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
    const removeTask = await Task.findById(req.params.id);
    const projectId = removeTask.project;
    const requester_id = req.user._id;
    const project = await Project.findById(projectId);
    if (!project || !removeTask) {
      return res.status(404).json({ message: "Not found" });
    }
    if (
      project.owner.toString() !== requester_id &&
      !project.managers.includes(requester_id) &&
      !req.user.admin
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json(removeTask);
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
