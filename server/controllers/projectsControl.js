const mongoose = require("mongoose");
const models = require("../models/model");
const Project = models.Project;
const User = models.User;
const Task = models.Task;

function removeDuplicates(array) {
  return array.filter((value, index, self) => {
    return self.findIndex(item => item._id.toString() === value._id.toString()) === index;
  });
}

const listProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("owner")
      .populate("members")
      .populate("managers");
      const populateTasks = async (projects) => {
        for (const project of projects) {
          const tasks = await Task.find({ project: project._id }).populate(
            "user"
          );
          console.log(tasks);
          project.tasks = tasks;
        }
      };

      await populateTasks(projects);
    const modifiedProjects = projects.map((project) => ({
      ...project._doc,
      owner: project.owner._doc,
      allRelatedUsers: removeDuplicates([
        project.owner,
        ...project.managers,
        ...project.members,
      ]),
    }));
    res.json(modifiedProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("columns");
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProject = async (req, res) => {
  const project = new Project(req.body);
  try {
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    console.log(req.body)
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
};

const deleteProject = async (req, res) => {
  try {
    const removedProject = await Project.findByIdAndRemove(req.params.id);

    if (!removedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(removedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
